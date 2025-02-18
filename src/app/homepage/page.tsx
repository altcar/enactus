"use client"
import Image from "next/image";
import ProjectCard from "../components/ProjectCard";
import Review from "../components/customer"
import Link from "next/link";
import { useEffect, useRef } from "react"; // <-- added useRef and useEffect
import gsap from "gsap";                // <-- import gsap
import { ScrollTrigger } from "gsap/ScrollTrigger"; // <-- import ScrollTrigger
import Typewriter from 'typewriter-effect';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Create refs for the left and right containers in the #project section
  const leftProjectRef = useRef<HTMLDivElement>(null);
  const rightProjectRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP and scroll trigger on mount
  useEffect(() => {
    // Initial animation for the logo
    gsap.set(".theprojectcardlogo", {
      position: "fixed",
      top: "30%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 2,
      zIndex: 100
    });

    // Create a timeline for the logo animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ourprojectcontainer",
        start: "bottom 100%",
        end: "bottom -20%",
        scrub: 1,
        markers: false,
        onUpdate: (self) => {
          // Calculate scale based on scroll progress
          const scale = gsap.utils.interpolate(2, 1, self.progress);
          const yPercent = gsap.utils.interpolate(-50, 0, self.progress);
          // Modified xPercent interpolation to move towards left
          const xPercent = gsap.utils.interpolate(-50, 0, self.progress);
          const position = self.progress === 1 ? "relative" : "fixed";
          const left = gsap.utils.interpolate(50, 0, self.progress);

          gsap.set(".theprojectcardlogo", {
            scale: scale,
            yPercent: yPercent,
            xPercent: xPercent,
            position: position,
            top: position === "relative" ? "auto" : "30%",
            left: position === "relative" ? "auto" : `${left}%`
          });
        }
      }
    });
    // Original project scroll animation
    if (leftProjectRef.current && rightProjectRef.current && rightContentRef.current ) {
      const numProjects = window.innerWidth > 768 ? 7.5 : 6;
      const distance = window.innerHeight * (numProjects - 1);

      gsap.timeline({
        scrollTrigger: {
          trigger: ".ourprojectcontainer",
          start: "top top",
          end: () => `+=${distance}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: false,
        }
      }).to(rightContentRef.current, {
        y: -distance,
        ease: "none"
      });
    }

    // Timeline animations
    gsap.from(".timeline-item", {
      scrollTrigger: {
        trigger: ".ourachievementcontainer",
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 1
    });

    gsap.from(".timeline-dot", {
      scrollTrigger: {
        trigger: ".ourachievementcontainer",
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      },
      scale: 0,
      stagger: 0.3,
      duration: 0.5
    });

  }, []);
  return (
    <main className="text-black overflow-hidden">
      {/* bg-yellow-50  */}
      <div className="containcontainerhero bg-[url('/main/hero-award.jpg')] w-full bg-no-repeat bg-cover min-h-[100vh] md:h-[700px] relative flex justify-center items-center">
        <div className="containerhero w-full bg-black/70 min-h-[100vh] md:h-[700px] h-full flex flex-col items-center p-5 md:p-0 relative justify-start ">
          <h1 className="text-5xl md:text-6xl text-white font-extrabold md:leading-[80px] w-[80%] mt-12 lg:mt-64 hero-introduction uppercase">
            Enactus Sheffield:{" "}
            <br />
            <div className="inline">
              <Typewriter
                options={{
                  strings: ['IMPROVING LIVES AND TRANSFORMING COMMUNITIES', 'Where passion meets purpose, and dedication ignites change!'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 20,
                  delay: 50,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('IMPROVING LIVES AND TRANSFORMING COMMUNITIES')
                    .pauseFor(2500)
                    .deleteAll()
                    .typeString('Where passion meets purpose, and dedication ignites change!')
                    .pauseFor(2500)
                    .deleteAll()
                    .start();
                }}
              />
            </div>
          </h1>
          <div className="flex flex-col mt-3 md:mt-12 text-white">
            <div className="flex flex-row ">
              <div className="w-[24px] invert m-5 logotoyellow"
                dangerouslySetInnerHTML={{
                  __html: '<a href="https://linktr.ee/enactus_sheffield"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Linktree</title><path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z"/></svg>',
                }}></div>
              <div className="w-[24px] invert m-5 logotoyellow"
                dangerouslySetInnerHTML={{
                  __html: '<a href="https://www.linkedin.com/company/enactus-sheffield-limited/"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>',
                }}></div>
              <div className="w-[24px] invert m-5 logotoyellow"
                dangerouslySetInnerHTML={{
                  __html: '<a href="https://www.instagram.com/enactussheffield_/"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg></a>',
                }}></div>
            </div>
            <Link href="https://chat.whatsapp.com/ENSY7aCCdXC94cUdKaMcxY" className="border-2 p-3 text-center hover:bg-white hover:text-black border-white">Join WhatsApp!</Link>

          </div>


        </div>

        {/* Add the wave divider and partner section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px]"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-yellow-400"
            ></path>
          </svg>

          <div className="bg-yellow-400 w-full py-8">
            <div className="container mx-auto px-4">
              <h3 className="text-2xl font-semibold text-center mb-6">Our Key Partners</h3>
              {/* Desktop view - static grid */}
              <div className="isolate flex flex-wrap justify-center items-center gap-8 max-h-[10vh] lg:max-h-[20vh]">
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.fordphilanthropy.org/our-work"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/5249fc11-83eb-4cbc-8fa2-6104630b4495/Ford+Philanthropy+Logo.png" alt="Ford Philanthropy Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.schroders.com/en/global/individual/about-us/who-we-are/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/33f1e202-331a-41d0-b187-c1788c88c6b2/Schroders+Logo.png" alt="Schroders Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://careers.enterprise.co.uk/about-us"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/07e4b3d1-a937-4530-ad8a-b77c5bb1fe1d/Enterprise+Mobility+Logo.png" alt="Enterprise Mobility Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.bdo.co.uk/en-gb/about/our-sustainability-and-esg-commitments?_gl=1%2Abz3lei%2A_ga%2AMTkzNzg5Mjg3OS4xNzI0MTYyNzM4%2A_up%2AMQ.."><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/3169e97b-186e-43e6-be0a-fcc47a9bce1c/BDO+Logo.png" alt="BDO Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.britishairways.com/content/information/about-ba/ba-better-world"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/5fd0a75e-3f6d-4ff2-a0c6-765082fa9ea2/British+Airways+Logo.png" alt="British Airways Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://reckitt.com/our-company/our-purpose/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/58de13e1-9d1c-4a18-9ab5-1ced378d5055/Reckitt+Logo.png" alt="Reckitt Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.bentley.com/company/about-us/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/2eb7feaf-3493-4473-bdc6-79e5bf4f92c6/Bentley+Systems+Logo.png" alt="Bentley Systems Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://rskgroup.com/at-our-core/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/16aa8ae8-8ac4-421d-9896-9f30ca1e7950/RSK+Logo.png" alt="RSK Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.xpo.com/about-us/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/959a59f4-ea48-45c3-8a75-57c040a47669/XPO+Logo.png" alt="XPO Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.sap.com/uk/products/sustainability/our-approach.html"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/e29d5676-e30e-445d-9f2f-29d2e57426bb/SAP+Logo.png" alt="SAP Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.ey.com/en_uk/about-us"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/fb280e77-a00e-411a-b486-07c7d7aee32b/EY+Logo.png" alt="EY Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.unilever.com/our-company/strategy/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/a3fe6609-3127-4472-b148-005fbce3fd7f/Unilever+Logo.png" alt="Unilever Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://magnitglobal.com/us/en/company/about-us.html"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/24047ebf-43c6-4a30-a97a-2c6d968e9fcd/Magnit+Logo.png" alt="Magnit Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.aboutamazon.co.uk/news/job-creation-and-investment/our-mission#:~:text=Our%20mission%20is%20to%20continually,Earth's%20most%20customer%20centric%20company."><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/55328e33-ab6f-4f1f-b2c1-b70db1cf91c5/Amazon+Logo.png" alt="Amazon Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.hsbc.com/who-we-are/purpose-values-and-strategy"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/9f6b8683-f6c0-4542-865d-1809700a2f56/HSBC+Logo.png" alt="HSBC Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.aig.com/about-us"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/ef59eafc-9f76-450a-b18c-b1c2dd43296a/AIG+Logo.png" alt="AIG Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.arla.com/company/strategy/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/e9601edd-c0ac-487c-aeb4-7af7b4304d07/Arla+Logo.png" alt="Arla Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://moypark.com/about/operations/albert-van-zoonen/about#:~:text=Our%20Mission,change%20within%20the%20business%20unit."><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/1374ce4f-917b-43c2-bfc6-800c2ead3256/Moy+Park+Logo.png" alt="Moy Park Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://uk.stop-hunger.org/home/about-us/ourvision.html"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/8c9c2b85-d0b8-430f-a03f-815188d932a8/Sodexo+Stop+Hunger+Logo.png" alt="Sodexo Stop Hunger Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.rothschildandco.com/en/corporate-sustainability/randco4generations/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/50d5c64f-6ea1-4f1a-9542-57acbac1e524/R%26Co4+Generations+Logo.png" alt="R&amp;Co4 Generations Logo.png" /></a></p>
                <p className="mix-blend-mulitply hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.pmi.org/about"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/277365b5-88eb-4555-a0ee-1706a0afe2ec/PMI+Logo.png" alt="PMI Logo.png" /></a></p>
              </div>

           
              </div>
          </div>
        </div>
      </div>

      <div className="" id="about"></div>
      <div className="aboutEnactus w-[80%] mx-auto my-32 text-xl">
        <h1 className="w-full text-center text-5xl font-semibold my-14">What is Enactus?</h1>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {/* <Image src="/main/logo.png" alt="Vercel Logo" width={300} height={300} className="mb-6"></Image> */}
          <iframe
// srcDoc can lazyload youtube video making website load faster
            srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/2MTsFX2pw6M?autoplay=1><img src=https://img.youtube.com/vi/2MTsFX2pw6M/hqdefault.jpg alt='What is Enactus? – Enactus'><span>▶</span></a>"
          width="560" height="315" src="https://www.youtube.com/embed/2MTsFX2pw6M?si=LK0KqW9yp-w0cSBw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div className="flex flex-col md:w-[50%] md:ml-10">
            <p className="bg-white p-2 rounded-2xl border-b-2 border-black border-l-4 "><b className="text-5xl text-yellow-500">EN</b> trepreneurial - having the perspective to see an opportunity and the talent to create value from that opportunity; </p>
            <p className="bg-white p-2 rounded-2xl border-b-2 border-black border-l-4  mt-4">        <b className="text-5xl text-yellow-500">ACT</b>ion - the willingness to do something and the commitment to see it through even when the outcome is not guaranteed; </p>
            <p className="bg-white p-2 rounded-2xl border-b-2 border-black border-l-4  mt-4"> <b className="text-5xl text-yellow-500">US</b>- a group of people who see themselves connected in some important way; individuals that are part of a greater whole..</p>

          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-flow-row mb-10 mt-10 text-center gap-16 font-">

          <div className="bg-white p-2 rounded-2xl flex flex-col items-center border-b-4 border-l-8 border-black ">
            <Image src="/main/EnactusUniversityClipart.png" width={400} height={200} alt="Vercel Logo" className="block w-[200px] md:w-[400px]"></Image>
            <p>Enactus Sheffield is one of over 1,700 Enactus teams around the world, all working on developing social impact projects.
              Student-led social enterprise, which sits within the University&apos;s Partnerships and Regional Engagement department</p>
          </div>
          <div className="bg-white p-2 rounded-2xl flex flex-col items-center border-b-4 border-l-8 border-black ">
            <Image
              src="/files/Site Files/Enactus+Team+Clipart.png" width={400} height={200} alt="Vercel Logo" className="block w-[200px] md:w-[400px]"></Image>
            <p>Our members innovate, research and manage social impact projects which provide sustainable solutions to local issues. Being part of Enactus is a unique and valuable experience as it facilitates student development in a broad range of areas, such as commercial and social entrepreneurship, technical experience and confidence building.</p>
          </div>
          <div className="bg-white p-2 rounded-2xl flex flex-col items-center border-b-4 border-l-8 border-black ">
            <Image
              src="/files/Site Files/Enactus+Trophy+Clipart.png" width={400} height={200} alt="Vercel Logo" className="block w-[200px] md:w-[400px]"></Image>
            <p>We believe that Enactus is a great stepping stone to future employment, and a unique opportunity to learn a variety of skills in different fields.
              Every year, we will complete in National Expo in honour to our hard work over the year.</p>
          </div>
        </div>
      </div>
      <div
        className="ourprojectcontainer h-screen bg-yellow-400/90"
      >
        <div className="h-screen flex flex-col justify-center items-center">

          <div className="flex flex-row w-full h-full">
            <div ref={leftProjectRef} className="w-1/2 items-center justify-center hidden md:flex">
              <div className="theprojectcardlogo">
                <h1 className="text-center text-2xl font-semibold pb-10">Our projects</h1>
                {/* mb-14 */}
                {/* <Image
                  src="/main/logo.png"
                  alt="Enactus Logo"
                  width={400}
                  height={400}
                  className=""
                /> */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-row">
                    <Image width={150} height={100} className="block mix-blend-multiply" src={"/files/all logos/OnTarget Logo.png"} alt="project logo"></Image>
                    <Image width={100} height={100} className="block mix-blend-multiply" src={"/files/all logos/Code Creators.png"} alt="project logo"></Image>
                    <Image width={100} height={100} className="block mix-blend-multiply" src={"/main/EMARKETING.png"} alt="project logo"></Image>

                  </div>
                  <div className="flex flex-row">
                    <Image width={150} height={100} className="block mix-blend-multiply" src={"/files/intell.jpg"} alt="project logo"></Image>

                    <Image width={100} height={100} className="block mix-blend-multiply" src={"/files/carte/carte logo capitals transparent background.png"} alt="project logo"></Image>
                    <Image width={100} height={100} className="block mix-blend-multiply" src={"/files/vape drop/vapedrop_logo_edited.jpg"} alt="project logo"></Image>

                  </div>
                </div>
              </div>
            </div>
            <div
              ref={rightProjectRef}
              className="w-screen md:w-1/2 overflow-hidden relative"
              id="project-scroll"
            >
              <div
                ref={rightContentRef}
                className="w-full"
              >
                <p className="flex-col items-center  justify-center pb-64 project-card h-screen p-8  hidden md:flex"></p>

                <p className="flex-col items-center  justify-center pb-64 project-card h-[50vh] p-8  hidden md:flex"></p>
                <ProjectCard color="bg-orange-100" link="/ontarget" image="/files/all logos/OnTarget Logo.png" title="OnTarget" content="Having established a partnership with Sheffield Wednesday -  OnTarget, aims to increase employability prospects of students in Sheffield, and promote the inclusion of at-risk young people through mentor-based activities and events." />
                <ProjectCard color="bg-blue-50" link="/codecreators" image="/files/all logos/Code Creators.png" title="CodeCreators" content="Introduces students to programming in Python, supplementing their education in analytics, computer science and digital infrastructure.This year, we want to expand Code Creators and develop a fun course that we can offer to school students. " />
                <ProjectCard color="bg-yellow-100" link="/emarketing" image="/main/EMARKETING.png" title="E-marketing" content="(Formerly Be Social Flamingo) EMarketing is Enactus Sheffield's talented internal PR team. They provide digital marketing for Enactus Sheffield projects and work to promote digital literacy and social media skills across Enactus and the university. " />
                <ProjectCard color="bg-green-50" link="/vapedrop" image="/files/vape drop/vapedrop_logo_edited.jpg" title="VapeDrop" content="A new local project, is still in its research and development stage. VD focuses on collecting disposable vapes (electronic cigarettes) by introducing our vape drop stop baskets that will be distributed throughout campus, disassembling them and recycling some of their components." />
                <ProjectCard color="bg-red-50" link="/carte" image="/files/carte/carte logo capitals transparent background.png" title="OnTarget" content="Still in its initial stages, this project works together with Sheffield Voices, to bring students and people with learning disability together to create and sell cards. The profit will is fed back into supporting the Art Programme at Sheffield Voices. " />
                <ProjectCard color="bg-blue-50" link="/ii" image="/files/intell.jpg" title="Intellect interpreters" content="Intellect interpreters is a university interpreting service that helps the community with translation services they may require. Our team will be made of students who can speak another language fluently and they will be trained to help people e.g. refugees with filling out forms and making appointments." />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ourachievementcontainer my-32">
        <h1 className="w-full text-center text-5xl font-semibold mb-14">Our Achievements</h1>
        <div className="grid md:grid-cols-2 justify-items-center gap-3 md:gap-12 md:w-[90%] mx-auto text-center md:text-start max-w-[1000px]">
          <div className="col-span-2 p-5 !text-center">
            <h1 className=" text-4xl font-semibold">National Expo</h1>
            <p className="text-xl">For the last decade we have been participating in the UK National Expo, where teams from across the country share their fantastic accomplishments.</p>
          </div>
        </div>






        <div className="relative flex justify-center">
          {/* Timeline line */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-500"></div>

          {/* Timeline content */}
          <div className="w-[80%] max-w-[1000px] translate-x-[42px]">
            <div className="timeline-item flex items-center mb-20">
              <div className="w-[45%] text-right pr-8">
                <div className="text-3xl font-bold">2024</div>
                <p>Can Sheffield be the winner of Enactus World Cup? Stay tuned to our National Expo in 25th April, 2025</p>
              </div>   <div className="timeline-dot w-4 h-4 bg-yellow-500 rounded-full z-10"></div>
              <div className="w-[45%] pl-8">
                <Image
                  src="/main/hero-award.jpg"
                  width={400}
                  height={300}
                  alt="2022 Award"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="timeline-item flex items-center mb-20">
              <div className="w-[45%] pl-8">
                <Image
                  src="/main/hero-award.jpg"
                  width={400}
                  height={300}
                  alt="2022 Award"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="timeline-dot w-4 h-4 bg-yellow-500 rounded-full z-10"></div>
              <div className="w-[45%] pl-8">
                <div className="text-3xl font-bold">2023</div>
                <p>This year we got into regional finals and compete in top 15 national</p>
              </div>

            </div>

            <div className="timeline-item flex items-center">
              <div className="w-[45%] text-right pr-8">
                <div className="text-3xl font-bold">2022</div>
                <p className="mb-4">National Runner up!</p>
                <p>This year we came second in the National Competitions out of 60 other Enactus teams!</p>
              </div>
              <div className="timeline-dot w-4 h-4 bg-yellow-500 rounded-full z-10"></div>
              <div className="w-[45%] pl-8">
                <Image
                  src="/main/hero-award.jpg"
                  width={400}
                  height={300}
                  alt="2022 Award"
                  className="rounded-lg shadow-lg"
                />
              </div> </div> </div> </div>
        {/* <div className="flex flex-col justify-center items-center bg-orange-200/50 p-5 text-center">
                <div className="text-3xl">2023</div>
                  <p>This year we got into regional finals and compete in top 15 national</p>
                </div>
              <div className="flex flex-col justify-center items-center bg-orange-200/50 p-5 text-center">
                <div className="text-3xl">2024</div>
                  <p> Can Sheffield be the winner of Enactus World Cup? Stay tuned to our National Expo in 25th April, 2025</p>
                </div>
              <div className="flex col-span-2 flex-col justify-center items-center bg-orange-500/25 p-5">
                <div className="text-3xl">2022</div>
                <div className="flex flex-col md:flex-row items-center jusitfy center md:gap-24 gap-3">
                  <Image src="/main/hero-award.jpg" width={600} height={500} alt="Vercel Logo" className="md:h-[300px]"></Image>
                  <div className="">
                    <div className="text-3xl">National Runner up!</div>
                    <p>This year we came second in the National Competitions out of 60 other Enactus teams!</p>
                  </div>
                  </div>
              </div> */}
        <div className="grid md:grid-cols-2 justify-items-center gap-3 md:gap-12 md:w-[90%] mx-auto text-center md:text-start max-w-[1000px]">
          <div className="flex col-span-2 pt-16 pb-0 text-4xl font-semibold">
            <h1>Success Stories</h1>
          </div>
          <div className="flex col-span-2 flex-col md:flex-row justify-center items-center md:items-start gap-12">
            <a href="https://motion.org.uk/" className="flex flex-col justify-center items-center w-[90%] md:w-[40%]">
              <div className="text-3xl">motion</div>
              <Image src="/files/all logos/Motion.png" width={400} height={200} alt="Vercel Logo" className="h-[180px]"></Image>
              <p>A digital platform for care services to showcase improved care outcomes to existing and prospective families to boost their customer satisfaction and increase occupancy.</p>
            </a>
            <div className="flex flex-col justify-center items-center w-[90%] md:w-[40%]">
              <div className="text-3xl">FreeFlow</div>
              <Image src="/files/all logos/FreeFlow.png" width={200} height={200} alt="Vercel Logo" className="h-[180px]"></Image>
              <p>A transformative initiative aimed at addressing crucial societal issues in Sheffield. By tackling period poverty, we aim to ensure access to essential menstrual products for all. Additionally, our efforts focus on reducing plastic waste through sustainable practices, contributing to a cleaner environment. Moreover, by combating the cost of living crisis, we strive to make a positive impact on the community financial well-being</p>
            </div>
          </div>

          <div className="flex col-span-2 p-10 text-4xl">
            <h1>Customer Reviews</h1>
          </div>
          <div className="col-span-2 ">
            <div className="grid md:grid-cols-3 justify-items-center gap-12 md:w-[90%] mx-auto">
              <Review stars={4} name="Ben Simpson" comment="I would definitely recommend this service. I am happy to work with Enactus Sheffield again"></Review>
              <Review stars={3} name="Ben Simpson" comment="I would definitely recommend this service. I am happy to work with Enactus Sheffield again"></Review>
              <Review stars={5} name="Ben Simpson" comment="I would definitely recommend this service. I am happy to work with Enactus Sheffield again"></Review>
              <Review stars={4} name="Ben Simpson" comment="I would definitely recommend this service. I am happy to work with Enactus Sheffield again"></Review>
              <Review stars={3} name="Ben Simpson" comment="I would definitely recommend this service. I am happy to work with Enactus Sheffield again"></Review>
              <Review stars={5} name="Ben Simpson" comment="I would definitely recommend this service. I am happy to work with Enactus Sheffield again"></Review>
            </div>
          </div>
        </div>





      </div >


      {/* <div className="ourcommitteecontainer py-32 flex justify-center items-center flex-wrap ">
        <h1 className="w-full text-center text-5xl font-semibold mb-14">Latest News</h1>
        <script async src="//www.instagram.com/embed.js"></script>
        <div className=" flex flex-row [&>*]:mx-3 flex-wrap justify-center">
          <div className="inline w-[90vw] md:w-auto"
            dangerouslySetInnerHTML={{
              __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DBwhEM1tgI7/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DBwhEM1tgI7/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DBwhEM1tgI7/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Enactus Sheffield (@enactussheffield_)</a></p></div></blockquote>`,
            }}></div>
          <div className="inline w-[90vw] md:w-auto"
            dangerouslySetInnerHTML={{
              __html: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DBZAuy-sYMx/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DBZAuy-sYMx/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DBZAuy-sYMx/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Enactus Sheffield (@enactussheffield_)</a></p></div></blockquote>`,
            }}></div>
          <div className="inline w-[90vw] md:w-auto"
            dangerouslySetInnerHTML={{
              __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C53htG1tb_Y/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/C53htG1tb_Y/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/C53htG1tb_Y/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Enactus Sheffield (@enactussheffield_)</a></p></div></blockquote>`,
            }}></div>
        </div>
      </div><div className="ourcommitteecontainer py-32 flex justify-center items-center flex-wrap ">
        <h1 className="w-full text-center text-5xl font-semibold mb-14">Meet the committee</h1>
        <Image
          src="/files/Site Files/image.png" width={1000} height="0" alt="Vercel Logo" className="block mx-auto"></Image>

      </div> */}
      {/* <div className="my-32">
        <h1 className="w-full text-center text-5xl font-semibold mb-14">Our partners</h1>
        <div className="flex flex-row flex-wrap w-[100%] md:w-[70%] max-w-[900px] mx-auto gap-2 md:gap-10 justify-center items-center">
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.fordphilanthropy.org/our-work"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/5249fc11-83eb-4cbc-8fa2-6104630b4495/Ford+Philanthropy+Logo.png" alt="Ford Philanthropy Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.schroders.com/en/global/individual/about-us/who-we-are/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/33f1e202-331a-41d0-b187-c1788c88c6b2/Schroders+Logo.png" alt="Schroders Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://careers.enterprise.co.uk/about-us"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/07e4b3d1-a937-4530-ad8a-b77c5bb1fe1d/Enterprise+Mobility+Logo.png" alt="Enterprise Mobility Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.bdo.co.uk/en-gb/about/our-sustainability-and-esg-commitments?_gl=1%2Abz3lei%2A_ga%2AMTkzNzg5Mjg3OS4xNzI0MTYyNzM4%2A_up%2AMQ.."><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/3169e97b-186e-43e6-be0a-fcc47a9bce1c/BDO+Logo.png" alt="BDO Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.britishairways.com/content/information/about-ba/ba-better-world"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/5fd0a75e-3f6d-4ff2-a0c6-765082fa9ea2/British+Airways+Logo.png" alt="British Airways Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://reckitt.com/our-company/our-purpose/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/58de13e1-9d1c-4a18-9ab5-1ced378d5055/Reckitt+Logo.png" alt="Reckitt Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.bentley.com/company/about-us/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/2eb7feaf-3493-4473-bdc6-79e5bf4f92c6/Bentley+Systems+Logo.png" alt="Bentley Systems Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://rskgroup.com/at-our-core/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/16aa8ae8-8ac4-421d-9896-9f30ca1e7950/RSK+Logo.png" alt="RSK Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.xpo.com/about-us/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/959a59f4-ea48-45c3-8a75-57c040a47669/XPO+Logo.png" alt="XPO Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.sap.com/uk/products/sustainability/our-approach.html"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/e29d5676-e30e-445d-9f2f-29d2e57426bb/SAP+Logo.png" alt="SAP Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.ey.com/en_uk/about-us"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/fb280e77-a00e-411a-b486-07c7d7aee32b/EY+Logo.png" alt="EY Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.unilever.com/our-company/strategy/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/a3fe6609-3127-4472-b148-005fbce3fd7f/Unilever+Logo.png" alt="Unilever Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://magnitglobal.com/us/en/company/about-us.html"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/24047ebf-43c6-4a30-a97a-2c6d968e9fcd/Magnit+Logo.png" alt="Magnit Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.aboutamazon.co.uk/news/job-creation-and-investment/our-mission#:~:text=Our%20mission%20is%20to%20continually,Earth's%20most%20customer%20centric%20company."><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/55328e33-ab6f-4f1f-b2c1-b70db1cf91c5/Amazon+Logo.png" alt="Amazon Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.hsbc.com/who-we-are/purpose-values-and-strategy"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/9f6b8683-f6c0-4542-865d-1809700a2f56/HSBC+Logo.png" alt="HSBC Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.aig.com/about-us"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/ef59eafc-9f76-450a-b18c-b1c2dd43296a/AIG+Logo.png" alt="AIG Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.arla.com/company/strategy/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/e9601edd-c0ac-487c-aeb4-7af7b4304d07/Arla+Logo.png" alt="Arla Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://moypark.com/about/operations/albert-van-zoonen/about#:~:text=Our%20Mission,change%20within%20the%20business%20unit."><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/1374ce4f-917b-43c2-bfc6-800c2ead3256/Moy+Park+Logo.png" alt="Moy Park Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://uk.stop-hunger.org/home/about-us/ourvision.html"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/8c9c2b85-d0b8-430f-a03f-815188d932a8/Sodexo+Stop+Hunger+Logo.png" alt="Sodexo Stop Hunger Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.rothschildandco.com/en/corporate-sustainability/randco4generations/"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/50d5c64f-6ea1-4f1a-9542-57acbac1e524/R%26Co4+Generations+Logo.png" alt="R&amp;Co4 Generations Logo.png" /></a></p>
          <p className="hover:bg-slate-200 border-2 rounded border-transparent grayscale hover:grayscale-0 flex justify-center items-center"><a href="https://www.pmi.org/about"><Image width={100} height={100} className="sponsorlogo" src="https://images.squarespace-cdn.com/content/v1/62726b549e95bf2087fc2759/277365b5-88eb-4555-a0ee-1706a0afe2ec/PMI+Logo.png" alt="PMI Logo.png" /></a></p>

        </div>
      </div> */}
      <div id="contact"></div>
    </main >
  )
}