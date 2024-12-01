'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Alert from "@/components/alerts/alert";
import OptionList from "@/components/OptionList";


export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState(Array(5).fill(null)); // Store user answers
    const [score, setScore] = useState(null); // Store score
    const correctAnswers = ["YUN", "ផ្ទះ", "រីករាយ", "រីករាយដែលបានជួបអ្នក។", "D"]; // Correct answers for the quiz
    const { handlerSuccessClick } = Alert(); // Alert functions
    const router = useRouter();
    const options1 = [
        { id: 1, label: "AUM" },
        { id: 2, label: "YOM" },
        { id: 3, label: "YUN" },
        { id: 4, label: "FON" },
    ];
    const options2 = [
        { id: 1, label: "តុ" },
        { id: 2, label: "ប្រអប់" },
        { id: 3, label: "ផ្ទះ" },
        { id: 4, label: "ទូរ" },
    ];
    const options3 = [
        { id: 1, label: "ចូលចិត្ត" },
        { id: 2, label: "ស្រឡាញ់" },
        { id: 3, label: "រីករាយ" },
        { id: 4, label: "ខឹង" },
    ];
    const options4 = [
        { id: 1, label: "ខ្ញំុស្រឡាញ់អ្នក។" },
        { id: 2, label: "តើអ្នកសុខសប្បាយឬទេ?" },
        { id: 3, label: "រីករាយដែលបានជួបអ្នក។" },
        { id: 4, label: "តើអ្នកឈ្មោះអ្វី?" },
    ];
    const options5 = [
        { id: 1, label: "A" },
        { id: 2, label: "B" },
        { id: 3, label: "C" },
        { id: 4, label: "D" },
    ];

    const handleAnswerSelect = (questionIndex, selectedAnswer) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionIndex] = selectedAnswer; // Update the selected answer
        setUserAnswers(updatedAnswers);
    };

    const calculateScore = () => {
        let totalScore = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === correctAnswers[index]) {
                totalScore += 1; // Increment score for correct answers
            }
        });
        setScore(totalScore); // Set the final score
        handlerSuccessClick(`Your Score: ${totalScore} / 5`);
        setTimeout(() => {
            router.push('/quiz/2');
        }, 3000);
        // alert(`Your Score: ${totalScore} / 5`); // Show score in an alert
    };

    return (
        <div className="flex flex-col h-full my-10 mx-10">
            {/* {score !== null && (
                <div className="mb-4">
                    <h2 className="text-2xl font-sans font-medium">Your Score: {score} / 5</h2>
                </div>
            )} */}
            <h1 className="text-3xl font-sans font-medium text-center">Quiz 1</h1>
            <div className="w-full">
                <h1 className="text-3xl font-sans font-medium">1. Question: What name does this sign represent?</h1>
                <div className="flex my-10 ">
                    <Image src="/quiz/Y.jpeg" alt="Y" width={200} height={200} />
                    <Image src="/quiz/U.jpeg" alt="U" width={200} height={200} />
                    <Image src="/quiz/N.jpeg" alt="N" width={200} height={200} />
                </div>
                <OptionList 
                    options={options1} 
                    onSelect={(answer) => handleAnswerSelect(0, answer)} // Pass question index
                />
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-sans font-medium">2. Question: What does this sign represent?</h1>
                <div className="flex my-10 ">
                    <Image src="/quiz/House.jpeg" alt="house" width={300} height={200} />
                </div>
                <OptionList 
                    options={options2} 
                    className="mx-10 w-1/2" 
                    onSelect={(answer) => handleAnswerSelect(1, answer.label)}
                />
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-sans font-medium">3. Question: What words does this sign represent?</h1>
                <div className="flex my-10 ">
                    <Image src="/quiz/Happy.jpeg" alt="Happy" width={300} height={200} />
                </div>
                <OptionList 
                    options={options3} 
                    className="mx-10 w-1/2" 
                    onSelect={(answer) => handleAnswerSelect(2, answer.label)}
                />
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-sans font-medium">4. Question: What is the sign on this gift?</h1>
                <div className="flex my-10 ">
                    <Image src="/quiz/NiceToMeetYou.gif" alt="Nice" width={300} height={200} priority />
                </div>
                <OptionList 
                    options={options4} 
                    className="mx-10 w-1/2" 
                    onSelect={(answer) => handleAnswerSelect(3, answer.label)}
                />
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-sans font-medium">5. Question: Which of these is the CSL sign for &quot;Smile&quot;?</h1>
                <div className="flex my-10 flex-row">
                    <div className="flex flex-col mx-10">
                        <Image src="/quiz/Again.jpeg" alt="Again" width={300} height={200} />
                        <h1 className="text-3xl font-sans font-medium text-center">A</h1>
                    </div>
                    <div className="flex flex-col mx-10">
                        <Image src="/quiz/Play.jpeg" alt="Play" width={300} height={200} />
                        <h1 className="text-3xl font-sans font-medium text-center">B</h1>
                    </div>
                    <div className="flex flex-col mx-10">
                        <Image src="/quiz/Want.jpeg" alt="Want" width={300} height={200} />
                        <h1 className="text-3xl font-sans font-medium text-center">C</h1>
                    </div>
                    <div className="flex flex-col mx-10">
                        <Image src="/quiz/Smile.jpeg" alt="Smile" width={300} height={200} />
                        <h1 className="text-3xl font-sans font-medium text-center">D</h1>
                    </div>
                </div>
                <OptionList 
                    options={options5} 
                    className="mx-10 w-1/2" 
                    onSelect={(answer) => handleAnswerSelect(4, answer.label)}
                />
            </div>
            <button 
                className="mt-4 px-4 py-3 bg-blue-500 text-white rounded" 
                onClick={calculateScore}
            >
                Submit
            </button>
        </div>
    );
};