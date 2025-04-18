

🦕 API: A Prehistoric Island
Welcome to API – not just your regular Application Programming Interface – but a Prehistoric Island where Achievement, Protection, and Inspiration rule the lava fields.
Built during a caffeine-fueled hackathon with a prehistoric twist, this app gamifies campus life through mini-games, smart tools, and dino-mite vibes.

Whether you’re a hunter of healthy habits, a protector of campus laws, or a seeker of academic scrolls, this island has something for every student-caveman.

🧭 Features
🔥 Quest for Campus Embers
Gamify your daily routines! Log workouts, track meals, and become a lava leaderboard legend.
Clone and integrate from: Quest for Campus Embers

🦖 DinoLaws
Drop your location and receive simple, fun legal/campus policy explanations. Perfect for cavemen and students alike!
Clone and integrate from: DinoLaw Microservice

📜 Ancient Scrolls
Upload notes, get TL;DRs and creative project ideas—plus get narrated guidance from a caveman mentor.
Clone and integrate from: Ancient Scrolls Microservice

🛠 Tech Stack
Frontend: HTML, CSS, JavaScript, prehistoric animations

Backend: FastAPI + Python (deployed on AWS EC2)

AI: Google Gemini 1.5 Pro for summarization and creativity

Voice Sync: Caveman narration meets scroll animations

Version Control: GitHub + pure survival instincts

🪨 Setup Guide
Here’s how to bring the island to life on your own local machine:

1. Clone the Main Repository
bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Navigate to the Web App Folder
bash
Copy
Edit
cd my-three-app
3. Install Dependencies
bash
Copy
Edit
npm install
4. Start the Development Server
bash
Copy
Edit
npm run dev
Once it’s running, open this in your browser:

arduino
Copy
Edit
http://localhost:5173/
🔗 Link Subservices to Your App
1. Clone the Subservices
Open a terminal and run:

bash
Copy
Edit
git clone https://github.com/Aditi08302/Quest-For-Campus-Embers
git clone https://github.com/mikele5895/bitcamp-dino-laws-microservice
git clone https://github.com/sumi0309/bitcamp-ancient-scroll-microservice
2. Run Subservices (Follow Their Individual README Setup)
Each service will expose a REST API endpoint (usually something like http://localhost:8000/endpoint)

3. Update index2.html with Live Service Links
Replace placeholder or mock links in your index2.html with the actual endpoints. For example:

html
Copy
Edit
<!-- OLD -->
<!-- <a href="/quest.html"> -->

<!-- NEW -->
<a href="http://localhost:8000/quest"> <!-- Quest for Campus Embers -->
<a href="http://localhost:8001/dino-laws"> <!-- DinoLaws -->
<a href="http://localhost:8002/ancient-scrolls"> <!-- Ancient Scrolls -->
Make sure the ports match the ones used by the microservices when running locally. If deployed, update with the correct hosted URLs.

🏆 Achievements
Deployed full-stack mini services working together

Learned AWS EC2, Gemini APIs, FastAPI, and syncing animations with voice

Kept the theme fun but practical – even impressed other hackers!

Helped one teammate build a microservice solo for the first time!

📚 Lessons Learned
Humor + UI/UX = ❤️

Prompt design makes or breaks your AI results

Anyone can become a full stack developer in 24 hours with enough delulu and teammates

Great hacks happen when everyone lifts each other up

🗺️ Roadmap
More tribes and roles to customize campus identity

Mobile version to carry the Island everywhere

Share scrolls and embers with friends via social media

University-specific DinoLaws expansions

Sync with class calendars, campus events, and clubs

🧡 Credits
Built with brain cells, backup snacks, and brute force by Team API during Bitcamp 2025.
Big love to the mentors, volunteers, and dino-souls who cheered us on.

