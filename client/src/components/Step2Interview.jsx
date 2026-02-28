import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../App";
import { BsArrowRight } from "react-icons/bs";

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  /* ---------------- VIDEO SOURCE (PUBLIC FOLDER) ---------------- */
  const videoSource =
    voiceGender === "male"
      ? "/videos/male-ai.mp4"
      : "/videos/female-ai.mp4";

  /* ---------------- LOAD VOICES ---------------- */
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice = voices.find(v =>
        v.name.toLowerCase().includes("male") ||
        v.name.toLowerCase().includes("david") ||
        v.name.toLowerCase().includes("mark")
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  /* ---------------- SPEAK FUNCTION ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        text.replace(/,/g, ", ... ").replace(/\./g, ". ... ")
      );

      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) startMic();

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  /* ---------------- INTRO + QUESTIONS ---------------- */
  useEffect(() => {
    if (!selectedVoice) return;

    const run = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );
        await speakText(
          "I'll ask you a few questions. Just answer naturally and take your time. Let's begin."
        );
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }
        await speakText(currentQuestion.question);
      }
    };

    run();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    setTimeLeft(currentQuestion.timeLimit || 60);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isIntroPhase]);

  /* ---------------- SPEECH RECOGNITION ---------------- */
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;
      setAnswer(prev => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    try {
      recognitionRef.current?.start();
    } catch {}
  };

  const stopMic = () => {
    recognitionRef.current?.stop();
  };

  const toggleMic = () => {
    isMicOn ? stopMic() : startMic();
    setIsMicOn(!isMicOn);
  };

  /* ---------------- SUBMIT ANSWER ---------------- */
  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic();
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true }
      );

      setFeedback(res.data.feedback);
      await speakText(res.data.feedback);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- NEXT / FINISH ---------------- */
  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");
    setCurrentIndex(prev => prev + 1);
  };

  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);

    try {
      const res = await axios.post(
        ServerUrl + "/api/interview/finish",
        { interviewId },
        { withCredentials: true }
      );
      onFinish(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (timeLeft === 0 && !feedback && !isSubmitting) {
      submitAnswer();
    }
  }, [timeLeft]);

  /* ---------------- CLEANUP ---------------- */
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current?.abort();
      window.speechSynthesis.cancel();
    };
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex overflow-hidden">

        {/* VIDEO */}
        <div className="w-1/3 p-6 border-r">
          <video
            ref={videoRef}
            src={videoSource}
            muted
            playsInline
            preload="auto"
            className="rounded-2xl shadow-lg w-full"
          />
          {subtitle && (
            <p className="mt-4 text-center text-gray-700 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-emerald-600 mb-6">
            AI Smart Interview
          </h2>

          {!isIntroPhase && (
            <div className="mb-4 p-4 bg-gray-50 rounded-xl">
              {currentQuestion?.question}
            </div>
          )}

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-40 p-4 border rounded-xl"
            placeholder="Type your answer..."
          />

          {!feedback ? (
            <div className="flex gap-4 mt-4">
              <button onClick={toggleMic} className="p-3 bg-black text-white rounded-full">
                {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
              </button>
              <button
                onClick={submitAnswer}
                className="flex-1 bg-emerald-600 text-white rounded-xl"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
              <p>{feedback}</p>
              <button
                onClick={handleNext}
                className="mt-3 w-full bg-emerald-600 text-white rounded-xl py-2"
              >
                Next <BsArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step2Interview;
