document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.bat_dau');
    const resetButton = document.querySelector('.choi-lai');
    const circles = document.querySelectorAll('.den');
    const carImages = document.querySelectorAll('.anhxe');
    const finishLine = document.querySelector('.dich');
    const fuelBars = document.querySelectorAll('.muc-xang');

    let winningCar = null; // Biến để xác định xe chiến thắng
    let gameInProgress = false; // Biến để xác định trò chơi đang diễn ra hay không

    startButton.addEventListener('click', function () {
        if (!winningCar && !gameInProgress) {
            resetGame();
            gameInProgress = true;

            // Bắt đầu trò chơi
            addCircleClass(circles[0], 'red');

            setTimeout(function () {
                removeCircleClass(circles[0], 'red');
                addCircleClass(circles[1], 'yellow');
            }, 1000);

            setTimeout(function () {
                removeCircleClass(circles[1], 'yellow');
                addCircleClass(circles[2], 'green');
                moveCarRandomSpeed(carImages[0], finishLine.offsetLeft);
                moveCarRandomSpeed(carImages[1], finishLine.offsetLeft);
            }, 2000);
        }
    });

    startButton.addEventListener('click', function () {
        console.log('Button clicked');
        if (!winningCar && !gameInProgress) {
            resetGame();
            gameInProgress = true;
            startFuelAnimation();
        }
    });
    
    function startFuelAnimation() {
        let fuelLevel = 100; // Giá trị ban đầu của thanh xăng
        const fuelInterval = setInterval(function () {
            fuelLevel -= 5; // Giảm giá trị thanh xăng (thay đổi tùy thuộc vào nhu cầu của bạn)

            // Cập nhật thanh xăng của tất cả các xe
            fuelBars.forEach(bar => {
                bar.style.height = fuelLevel + '%';
            });

            // Kiểm tra khi nào hết xăng
            if (fuelLevel <= 0) {
                clearInterval(fuelInterval);
                stopRace();
            }
        }, 100); // Thời gian cập nhật (đơn vị: mili giây)
    }

    function moveCarRandomSpeed(car, finishLinePosition) {
        const animationDuration = 4 + Math.random() * 6;

        car.style.animation = `moveCarAnimation ${animationDuration}s linear infinite`;
        car.style.animationPlayState = 'running';

        const keyframes = `@keyframes moveCarAnimation {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(${finishLinePosition - car.offsetLeft}px);
            }
        }`;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);

        car.addEventListener('animationiteration', function () {
            if (!winningCar) {
                winningCar = car;
                announceWinner();
            }
        });
    }

    function announceWinner() {
        if (winningCar) {
            const carNumber = winningCar.dataset.xe;
            alert(`Xe ${carNumber} chiến thắng!`);
            gameInProgress = false; // Dừng trò chơi khi có người chiến thắng
        }
    }

    function resetGame() {
        carImages.forEach(car => car.style.animation = 'none');
        gameInProgress = false; // Đặt lại trạng thái trò chơi khi bắt đầu lại
    }

    function addCircleClass(circle, className) {
        circle.classList.add(className);
    }

    function removeCircleClass(circle, className) {
        circle.classList.remove(className);
    }
    
});
