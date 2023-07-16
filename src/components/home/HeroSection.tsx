/* eslint-disable @next/next/no-img-element */
import { Link } from "react-router-dom";
import heroImage from "@/assets/images/bookimage.jpg";

export default function HeroSection() {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between items-center bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 mx-auto max-w-7xl">
      <div className="mx-auto max-w-7xl">
        <div className="bg-white dark:bg-slate-700 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl md:text-5xl">
                <span className="block xl:inline">
                  Dreams Take Flight on Pages:
                </span>{" "}
                <span className="block text-primary_dark dark:text-primary_light xl:inline">
                  Let Our Library Ignite Your Imagination.
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Enter the world's largest ancient library, where echoes of
                timeless wisdom and the brilliance of bygone minds await,
                inviting you to unlock the secrets of our shared human heritage.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/books"
                    className="flex w-full items-center justify-center rounded-md border border-transparent text-slate-100 bg-primary_dark px-8 py-3 text-base font-medium hover:bg-primary_dark md:px-10 md:text-lg"
                  >
                    Explore Now
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/books"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary_light px-8 py-3 text-base font-medium text-primary_dark hover:bg-primary_light md:px-10 md:text-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="pt-5 lg:pt-0 mx-auto max-w-7xl">
        <img
          className="py-5 w-full object-cover lg:w-[400px]"
          src={heroImage}
          alt="heroImage"
        />
      </div>
    </div>
  );
}
