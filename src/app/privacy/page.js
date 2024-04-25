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
    <body class="bg-gray-100">

<div class="container mx-auto py-8">

    <h1 class="text-3xl font-bold mb-4">Privacy Policy for BigCoin </h1>

    <div class="bg-white shadow p-6 rounded-lg mb-8">

        <h2 class="text-xl font-bold mb-4">Information We Collect</h2>

        <ul class="list-disc pl-5">
            <li class="mb-2">Biometric Data: BigCoin collects biometric data, specifically retina scans, from users for identification and authentication purposes.</li>
            <li>Personal Information: In addition to biometric data, we may collect personal information such as name, email address, contact details, and any other information provided voluntarily by users during registration or usage of the BigCoin system.</li>
        </ul>
    </div>

    <div class="bg-white shadow p-6 rounded-lg mb-8">

        <h2 class="text-xl font-bold mb-4">Use of Information</h2>

        <p>Biometric Data: Biometric data collected by BigCoin is used for authentication and identification purposes within the BigCoin system. This data is securely stored and processed to verify the identity of users. We reserve the rights to transfer the information to third-parties.</p>

    </div>


</div>

</body>


    </body>
  );
}
