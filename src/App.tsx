/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions, results, Result } from './data';
import { ChevronRight, RefreshCw, Users, Music } from 'lucide-react';

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;

    finalAnswers.forEach((ans, index) => {
      if (index < 5) ans === 'E' ? e++ : i++;
      else if (index < 10) ans === 'S' ? s++ : n++;
      else if (index < 15) ans === 'T' ? t++ : f++;
      else ans === 'J' ? j++ : p++;
    });

    const mbti = `${e > i ? 'E' : 'I'}${s > n ? 'S' : 'N'}${t > f ? 'T' : 'F'}${j > p ? 'J' : 'P'}`;
    setResult(results[mbti]);
  };

  const reset = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowAll(false);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 shadow-2xl"
        >
          <Music className="w-16 h-16 mx-auto mb-6 text-pink-300" />
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
            会所MBTI测试
          </h1>
          <p className="text-white/80 mb-8 leading-relaxed">
            测测你是会所（Taylor Swift粉丝群）里的哪位神仙群友？20道题，直击你的灵魂深处。
          </p>
          <button 
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            开始测试 <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  if (result) {
    if (showAll) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
          <div className="max-w-2xl mx-auto">
            <button 
              onClick={() => setShowAll(false)}
              className="mb-6 flex items-center gap-2 text-pink-300 hover:text-pink-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" /> 返回我的结果
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">所有会所角色图鉴</h2>
            <div className="space-y-4">
              {Object.values(results).map((r, idx) => (
                <motion.div 
                  key={r.mbti}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-pink-300">{r.name}</h3>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-mono">{r.mbti}</span>
                  </div>
                  <p className="text-white/90 text-sm mb-3 font-medium">{r.shortDesc}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{r.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center p-6 py-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-500/20 to-transparent"></div>
          
          <div className="relative z-10">
            <p className="text-center text-pink-300 font-medium mb-2">你的会所人格是</p>
            <h2 className="text-4xl font-bold text-center mb-2">{result.name}</h2>
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1 bg-white/20 rounded-full font-mono tracking-widest">
                {result.mbti}
              </span>
            </div>
            
            <div className="bg-black/20 rounded-2xl p-5 mb-6">
              <p className="text-white/90 font-medium leading-relaxed mb-4">
                "{result.shortDesc}"
              </p>
              <div className="h-px w-full bg-white/10 mb-4"></div>
              <p className="text-white/70 text-sm leading-relaxed text-justify">
                {result.description}
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setShowAll(true)}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" /> 查看所有角色图鉴
              </button>
              <button 
                onClick={reset}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> 再测一次
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col p-6">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-8 mt-4 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="text-sm text-pink-300 font-medium mb-4">
          Question {currentQuestion + 1} / {questions.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-8 leading-relaxed">
              {q.text}
            </h2>

            <div className="space-y-4 mt-auto mb-8">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full text-left p-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all active:scale-[0.98]"
                >
                  <p className="text-lg leading-relaxed">{opt.text}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
