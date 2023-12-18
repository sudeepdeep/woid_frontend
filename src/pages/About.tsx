import React from "react";

function About() {
  return (
    <>
      <div className="w-full flex justify-center mt-9 text-white ">
        Made with
        <span title="React JS">
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png"
            alt="react"
            className="w-[30px] h-[30px] rounded-md mx-2"
          />
        </span>
        <span title="Nest JS">
          <img
            src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9lZDI1OTU4NzA0MWM1YWI3OWYyNGNiMWUzNDFmMGEzNz9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.hLdG6hXQE4Dfil6090lrDEuGdsHbfQUijpy5RvzXjSg"
            alt="react"
            className="w-[30px] h-[30px] rounded-md mr-2"
          />
        </span>
        <span title="Tailwind">
          <img
            src="https://logowik.com/content/uploads/images/tailwind-css3232.logowik.com.webp"
            alt="react"
            className="w-[30px] h-[30px] rounded-md mr-2"
          />
        </span>
        <span title="MongoDB">
          <img
            src="https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png"
            alt="react"
            className="bg-white w-[30px] h-[30px] rounded-md mr-2"
          />
        </span>
        <span title="Firebase">
          <img
            src="https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png"
            alt="react"
            className="bg-white w-[30px] h-[30px] rounded-md mr-2"
          />
        </span>
      </div>

      <div className="h-[90vh] w-[100%] text-white flex flex-col gap-3 justify-center items-center">
        <div className="relative w-[300px] h-[300px] border-1 cursor-pointer border-white rounded-md overflow-hidden group">
          <div
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/astronaut-space-with-planet-background_1340-28941.jpg)",
            }}
            className="about-card absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover transition-all duration-300 ease-in-out group-hover:bg-blend-difference"
          ></div>
          <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-sm absolute top-0 left-0 transition-all duration-300 ease-in-out group-hover:backdrop-blur-md">
            <div className="text-sm font-extrabold opacity-50">
              Developed by
            </div>
            <div className="text-3xl font-extrabold">SUDEEP.K</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
