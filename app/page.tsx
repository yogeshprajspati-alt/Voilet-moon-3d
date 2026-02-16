import MoonScrollCanvas from "@/components/MoonScrollCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
    return (
        <main className="min-h-screen bg-transparent relative">
            <BackgroundMusic />
            <Navbar />

            {/* Primary Experience Wrapper */}
            <div className="relative">
                <MoonScrollCanvas />
            </div>

            {/* Final Rest Moment */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 bg-gradient-to-t from-black to-transparent py-16">
                <div className="text-center p-8 max-w-2xl max-h-screen overflow-y-auto">
                    <h2 className="text-3xl md:text-5xl font-thin text-violet-100 mb-8 tracking-widest">
                        I know you liked it 🐻‍❄️ React with 👾 if you did 
                    </h2>
                    <p className="text-violet-200/60 leading-relaxed font-light">
                        Waise mujhe kisi se koi setting metting nhi karni rehti.. wo bs us type ki moments banane ke liye bol rha tha men.. but i guess i can do that too if i want to.. but i dont want to.. so here we are.. just vibing with the moon and the music.. no meetings, no settings, just pure vibe.. hope you enjoyed the experience as much as i enjoyed creating it for you..🖤
                    </p>
                    <p className="text-violet-200/60 leading-relaxed font-light">Wo din yaad h jab mene bola tha chanchal se setting me help kar do, tumne bola tha me kyun karu, wo bhi meri hi dost ko patane me  😂bohot hasa tha me 😂👾 Mujhe interest nhi kisi me, sachme banani hoti to itni acchhi acchhi h kabka bana letaa. But here I amm.. still single, devoted..!!</p>
                    <p className="text-violet-200/60 leading-relaxed font-light">Truth is none of your friends can outshine you. Bhale thode sundar ho, lekin tumhari baat hi kuch alag h. I know tumhe nhi lagta hoga..Aajkal tumhe lagta h me aise hi bol rha hu 😂. Try to feel the difference.🌙 You are the moon they are just stars.</p>
                    <p className="text-violet-200/60 leading-relaxed font-light">Some day you will remember my words when you realise that special difference which makes you unique. I can tell this to you because I have seen hundreds of girls including indians/ foreigners. You are a unique soul with a special aura that can&apos;t be replicated. 🌙</p>
                    <p className="text-violet-200/60 leading-relaxed font-light">And I hope this small effort of mine puts a beautiful smile on your face (thin lips 😂). 🌙 You deserve everything you wish for. </p>
                    <p className="text-violet-200/60 leading-relaxed font-light">And remember — your smile is beautiful. Protect it, cherish it, and never lose it.</p>
                    <p className="text-violet-200/60 leading-relaxed font-light">I hope you had a great time exploring this little corner of the internet that I made just for you. You know what? You can&apos;t blink eyes while smiling....................... just kidding I just wanted you to smile and you did...!!! Yayyy mission successful.</p>
                    <p className="text-violet-200/60 leading-relaxed font-light">And maybe I deserve a little.... very very little attention of yours. 🙃🐻‍❄️ Are jyada socho mat text me and say it is amazing🦥🦥 vishwas karo 2 se 3 din khushi me jhoomunga me. </p>
                    <p className="text-violet-200/60 leading-relaxed font-light">Take Care Prachiii, You have a lot to deal with... 🌙 | Background music ke liye maafi lekin yahi match kar rha tha bs..... Or hasti raha karo.... cute lagti ho 😤😤 bohot jyada cute.</p>
                    
                </div>
            </section>

            <Footer />
        </main>
    );
}
