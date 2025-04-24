"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface QuestionAnswer {
  question: string;
  answer: string;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [flashcards, setFlashcards] = useState<QuestionAnswer[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const addFlashcard = () => {
    if (question && answer) {
      setFlashcards([...flashcards, { question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Flashcard</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="question">Question:</label>
            <Textarea
              id="question"
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="answer">Answer:</label>
            <Textarea
              id="answer"
              placeholder="Enter the answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <Button onClick={addFlashcard}>Add Flashcard</Button>
        </CardContent>
      </Card>

      {flashcards.length > 0 && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Flashcard</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="text-center">
              <p className="font-semibold">
                Q: {flashcards[currentCardIndex].question}
              </p>
              {showAnswer && (
                <p>
                  A: {flashcards[currentCardIndex].answer}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={prevCard}>Previous</Button>
              <Button onClick={toggleAnswer}>{showAnswer ? 'Hide Answer' : 'Show Answer'}</Button>
              <Button variant="secondary" onClick={nextCard}>Next</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
