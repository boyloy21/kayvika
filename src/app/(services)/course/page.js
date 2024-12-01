import React from "react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import Slider from "@/components/SliderImage";

export default function Course() {
    const images = [
        '/quiz/Hello.jpeg',
        '/quiz/Happy.jpeg',
        '/quiz/House.jpeg',
        '/quiz/Play.jpeg',
        '/quiz/Smile.jpeg',
        '/quiz/Want.jpeg',
        '/quiz/Go.jpeg',
        '/quiz/Water.jpeg',
        '/quiz/I Love You.jpeg',
        '/quiz/Again.jpeg',
      ];
    const captions = [
        "សួស្តី",
        "រីករាយ",
        "ផ្ទះ",
        "លេង",
        "ញញឹម",
        "ចង់",
        "ទៅ",
        "ទឹក",
        "ស្រឡាញ់",
        "ម្តងទៀត",
    ] 
    const images2 = [
        '/quiz/What.jpeg',
        '/quiz/When.jpeg',
        '/quiz/How.jpeg',
    ]
    const captions2 = [
        "តើ",
        "ពេលណា",
        "ប៉ុន្មាន",
    ]
    
    return (
        <div className="flex flex-col justify-start h-screen w-full my-12">
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី១ : អំពីពាក្យមូដ្ធានទំនាក់ទំនង</h1>
                <div className="flex flex-row">
                    <YouTubeEmbed videoId="course1" className="mx-5" />
                    <Slider images={images} captions={captions} autoSlide={false} className="mx-5"/>
                </div>
            </div>
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី២ : សំណួរ</h1>
                <div className="flex flex-row">
                    <YouTubeEmbed videoId="course2" className="mx-5" />
                    <Slider images={images2} captions={captions2} autoSlide={false} className="mx-5"/>
                </div>
            </div>
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី៣ : អំពីរថ្ងៃនៃសប្តាហ៍</h1>
                <YouTubeEmbed videoId="course3" />
            </div>
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី៤ : ការណែនាំខ្លួនរបស់អ្នក </h1>
                <YouTubeEmbed videoId="course4" />
            </div>
            <div className="mx-10 mt-10">
                <h1 className="text-3xl font-sans font-bold mb-5">មេរៀនទី៥ : អារម្មណ៍</h1>
                <YouTubeEmbed videoId="course5" />
            </div>
        </div>
    );
}