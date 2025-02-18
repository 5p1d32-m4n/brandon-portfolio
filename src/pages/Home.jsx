import selfie from "../assets/Brandon.jpg"

const Home = () => {
  return (
    <div className="h-full flex flex-col">
    {/* Home header */}
    <header className="p-4 flex flex-col items-center justify-center mt-12">
      <h1 className="text-4xl font-bold text-amber-200 tourney-unique">Crafting </h1>
      <h1 className="text-2xl font-bold text-xanthous tourney-unique">Scalable Solutions & Seamless User Experiences</h1>
    </header>

    {/* Main content with sidebar and cards */}
    <div className="flex flex-1 overflow-hidden">

      {/* Main Content */}
      <main className="flex-1 ml-4 p-4 overflow-y-auto">
        {/* Intro and call to action */}
      <div className="flex flex-row justify-between ml-10 mr-10">
        <div className="call-to-action">
            <h1 className="text-4xl">Hi, I'm Brandon Baker</h1>
            <h1 className="text-4xl text-columbia-blue">Software & Web Developer</h1>
            <h1 className="text-4xl">Based in Puerto Rico</h1>
            {/* Statement */}
            <p>I'm a full stack web developer and software engineer.</p>
        </div>
        <div className="pro-pic">
            <img src={selfie} alt="pro-pic" className="relative z-20" width={512} height={512} />
        </div>
      </div>
      </main>
    </div>
  </div>
  )
};

export default Home
