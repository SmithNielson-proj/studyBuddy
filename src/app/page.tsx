
"use client";

import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestionAnswer {
  question: string;
  answer: string;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [studyGuide, setStudyGuide] = useState<QuestionAnswer[]>([]);

  const addQuestion = () => {
    if (question && answer) {
      setStudyGuide([...studyGuide, { question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  const exportStudyGuide = () => {
    const text = studyGuide.map((qa) => `Q: ${qa.question}\nA: ${qa.answer}\n`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study_guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Question/Answer</CardTitle>
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
          <Button onClick={addQuestion}>Add to Study Guide</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border">
            <div className="p-4">
              {studyGuide.map((qa, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">Q: {qa.question}</p>
                  <p>A: {qa.answer}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {studyGuide.length > 0 && (
        <Button variant="secondary" onClick={exportStudyGuide}>Export Study Guide</Button>
      )}
    </div>
  );
}
