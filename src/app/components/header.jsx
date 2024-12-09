"use client";
import Image from "next/image";
import "./dropdown.css";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
export default function Home() {
  const [isClick, isSetClick] = useState(false);
  const pathname = usePathname()
  const toggleNavbar = () => {
    isSetClick(!isClick);
  };
    return (
      <>
        <header className={`flex flex-row justify-evenly items-center bg-transparent text-white top-0 z-30 whitetoyellow absolute w-[100%] ${isClick == true || pathname != "/"?"!bg-black": ""}  ${pathname != "/"?"!relative": ""}`}>
          <Link href="/" className="flex flex-col md:my-5 mt-2">
          <Image
          // layout="responsive"
            src="/main/logo.png"
            alt="Vercel Logo"
            
            height={30}
            width={108}
            // style={{width:'auto', height: "50px" }}
            className="brightness-0 invert"
          ></Image>
         
          <h2 className="ml-5 text-sm">University of Sheffield</h2>
          </Link>
          <div className="flex md:hidden basis-auto">
            <button onClick={toggleNavbar}>
              {isClick ? (
                <Image src="/main/cross.svg" width={47} height={47} alt="menu"></Image>
              ) : (
                <Image src="/main/hamburger.svg" width={47} height={47} alt="menu"></Image>
              )}
            </button>
            {/* <Link
              href="/contact-us"
              className="rounded-2xl m-2 py-1 !px-3 !bg-blue-800 text-white hover:!bg-blue-500 transition-all inline-block"
            >
              {t("contact")}
            </Link> */}
          </div>
          <div className="menulink  mt-5 hidden md:inline  [&>*]:transition-all">
  
            <Link href="/" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide">Home</Link>
            <Link href="/#about" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide">About</Link>
            
            <div className="dropdown">
              <Link href="/#project" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide dropbtn">Team
              <Image src="/main/hamburger.svg" width={25} height={25} alt="menu" className="inline ml-2"></Image></Link>
              <div className="dropdown-content bg-gray-800 text-white">
                <Link href="/codecreators">CodeCreators</Link>
                <Link href="/ontarget">OnTarget</Link>
                <Link href="/vapedrop">VapeDrop</Link>
                <Link href="/carte">Carte</Link>
                <Link href="/ii">Intellect interpreters</Link>
                <Link href="/emarketing">E-marketing</Link>
              </div>
            </div>
            <Link href="/apply" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide">Apply Now</Link>
            <Link href="/#contact" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide">Contact</Link>
          </div>
          <div className="searchbox inline">
              <div className="flex flex-row text-white">
                  <div className="w-[24px] invert md:m-5 m-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      '<a href="https://linktr.ee/enactus_sheffield"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Linktree</title><path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z"/></svg>',
                  }}></div>
                  <div className="w-[24px] invert  md:m-5 m-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      '<a href="https://www.linkedin.com/company/enactus-sheffield-limited/"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>',
                  }}></div>
                  <div className="w-[24px] invert  md:m-5 m-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      '<a href="https://www.instagram.com/enactussheffield_/"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg></a>',
                  }}></div>
                </div>
          </div>
         
        </header>
     
         <div className={`  md:hidden  !text-white z-20 relative ${pathname != "/"?"": "!top-[60px]"}  `}> 
         
          {isClick && (
            <>
              <div className="block !bg-gray-950 pt-3"> {/* fixing white gap  */}
                 <div className="menulink  mt-5 [&>*]:block" >
  
            <Link href="/#" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide">Home</Link>
            <Link href="/#about" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide">About</Link>
            
              <Link href="/#project" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide dropbtn  ">Team</Link>
                <Link className="ml-5 p-2" href="/codecreators/#">CodeCreators</Link>
                <Link className="ml-5 p-2" href="/ontarget/#">OnTarget</Link>
                <Link className="ml-5 p-2" href="/vapedrop">VapeDrop</Link>
                <Link className="ml-5 p-2" href="/carte/#">Carte</Link>
                <Link className="ml-5 p-2" href="/ii/#">Intellect interpreters</Link>
                <Link className="ml-5 p-2" href="/emarketing/#">E-marketing</Link>
            <Link href="/apply" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide">Apply Now</Link>
            <Link href="/#contact" className="p-2 border-t-2 m-2 border-teal-300 hover:tracking-wide">Contact</Link>
          </div>
                </div>
            </>
          )}
        </div></>
        )}