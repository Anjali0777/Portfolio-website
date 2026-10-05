window.onload = function () {
    const canvas = document.getElementById('patternCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const points = [];
    const numPoints = 200;
    const maxDistance = 100;

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(0, 150, 255, 0.5)';

        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];

            for (let j = i + 1; j < points.length; j++) {
                const p2 = points[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            p1.x += p1.vx;
            p1.y += p1.vy;

            if (p1.x < 0 || p1.x > width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > height) p1.vy *= -1;
        }

        requestAnimationFrame(draw);
    }

    draw();

    // Typing effect for text
    const titleText = "Welcome";
    const subtitleText = "This is Anjali Gupta's portfolio";
    const titleElement = document.getElementById("title");
    const subtitleElement = document.getElementById("subtitle");

    let titleIndex = 0;

    function typeTitle() {
        if (titleIndex < titleText.length) {
            titleElement.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, 150);
        } else {
            subtitleElement.classList.remove("hide");
            subtitleElement.style.animation = "typing 3s steps(40, end), blink-caret 0.75s step-end infinite";
        }
    }

    typeTitle();

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
};
