import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <body class="bg-gray-100">
     <nav class="bg-gray-800 py-4">
        <div class="container mx-auto flex justify-between items-center">
            <a href="#" class="text-white text-xl font-bold">BigCoin ID</a>
            <Link href="/signup">
            <button class="text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-700">Get Started</button>
          </Link>
        </div>
    </nav>

    <header class="py-20 bg-gray-900 text-white">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold">BigCoin ID</h1>
            <p class="mt-4 text-lg md:text-xl">Revolutionizing identification and payment.</p>
            <Link href="/signup">
            <button class="mt-8 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">Get started right away!</button>
          </Link>
        </div>
    </header>

    <section class="py-16">
        <div class="container mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">Key Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-md shadow-md">
                    <h3 class="text-xl font-bold mb-4">BigCoin Rewards</h3>
                    <p class="text-gray-700">Users earn BigCoins for each identification scan, more if you refer friends!.</p>
                </div>
                <div class="bg-white p-6 rounded-md shadow-md">
                    <h3 class="text-xl font-bold mb-4">Secure Retina Scanning</h3>
                    <p class="text-gray-700">Our advanced retina scanning technology ensures maximum security for user identification.</p>
                </div>
                <div class="bg-white p-6 rounded-md shadow-md">
                    <h3 class="text-xl font-bold mb-4">Fast Identification</h3>
                    <p class="text-gray-700">Instantaneous identification process saves time and provides a seamless user experience.</p>
                </div>
             
            </div>
        </div>
    </section>

    <section class="bg-gray-800 py-16 text-white">
        <div class="container mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p class="text-lg">Join the BigCoin ID revolution today and experience secure, efficient identification.</p>
            <button class="mt-8 bg-purple-600 text-white px-8 py-4 rounded-md hover:bg-purple-700">Sign Up Now</button>
        </div>
    </section>

    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto text-center">
            <p>&copy; 2024 BigCoin ID. All rights reserved.</p>
        </div>
    </footer>

    </body>
  );
}
