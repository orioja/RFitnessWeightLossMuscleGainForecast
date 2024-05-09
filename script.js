document.getElementById('weightLossForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const activityLevel = document.getElementById('activityLevel').value;
    const weightToLose = parseFloat(document.getElementById('weightToLose').value);
    const days = parseInt(document.getElementById('days').value);
    const proteinIntake = parseInt(document.getElementById('proteinIntake').value);

    // Calculate daily calorie needs
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let pal;
    switch(activityLevel) {
        case 'sedentary':
            pal = 1.2;
            break;
        case 'lightlyActive':
            pal = 1.375;
            break;
        case 'moderatelyActive':
            pal = 1.55;
            break;
        case 'veryActive':
            pal = 1.725;
            break;
        case 'extremelyActive':
            pal = 1.9;
            break;
        default:
            pal = 1.2;
    }

    const dailyCalorieNeeds = Math.round(bmr * pal);
    const weeklyCalorieNeeds = dailyCalorieNeeds * 7;

    // Calculate weight loss rate and goal date
    const weightLossRate = weightToLose / days;
    const currentDate = new Date();
    const goalDate = new Date(currentDate.setDate(currentDate.getDate() + days));

    // Health tips based on weight loss rate
    let healthTip = '';
    if (weightLossRate > 0.5) {
        healthTip = 'Rapid weight loss can be harmful to your health. It may lead to muscle loss, nutritional deficiencies, and a slower metabolism. It\'s important to lose weight gradually by making sustainable lifestyle changes. Consider consulting with a healthcare professional or registered dietitian for personalized advice and support.';
    } else if (weightLossRate < 0.1) {
        healthTip = 'Your weight loss rate is slow but steady, which is generally healthier and more sustainable in the long term. Slow weight loss allows your body to adapt and may help prevent muscle loss and metabolic slowdown. Remember to focus on making healthy food choices, staying physically active, and managing stress. Consistency is key to reaching your weight loss goals.';
    } else {
        healthTip = 'Your weight loss rate seems reasonable. Remember to prioritize a balanced diet that includes a variety of nutrient-rich foods such as fruits, vegetables, lean proteins, and whole grains. Stay hydrated by drinking plenty of water throughout the day. Incorporate regular physical activity into your routine to support your weight loss efforts and improve overall health.';
    }

    // Calories needed for weight gain
    const gainCaloriesDaily = dailyCalorieNeeds + 500; // Adding 500 calories for weight gain
    const gainCaloriesWeekly = weeklyCalorieNeeds + 3500; // Adding 3500 calories for weight gain per week

    // Calculate muscle gain
    const muscleGainRatePerDay = proteinIntake / 150; // Assuming 1.5 grams of protein per kg of lean body mass
    const muscleGainPerWeek = muscleGainRatePerDay * 7;
    const muscleGainPerMonth = muscleGainPerWeek * 4; // Assuming 4 weeks in a month

    // Display result
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <h2 style="font-family: 'Arial Black', sans-serif; font-size: 24px;">Results</h2>
        <div class="result-container">
            <div class="result-box">
                <h3 style="font-family: 'Verdana', serif; font-size: 25px;"><center>Daily and Weekly Calorie Needs</center></h3>
                <img src="ham.gif" alt="Daily and Weekly Calorie Needs" style="width: 100%; height: 200px;">
                <p style="font-family: 'Verdana', sans-serif; font-size: 16px;">Daily Calorie Needs: ${dailyCalorieNeeds} calories</p>
                <p style="font-family: 'Verdana', sans-serif; font-size: 16px;">Weekly Calorie Needs: ${weeklyCalorieNeeds} calories</p>
                <canvas id="calorieChart" width="400" height="200"></canvas>
            </div>
            <div class="result-box">
                <h3 style="font-family: 'Verdana', serif; font-size: 25px;"><center>Calories Needed for Weight Gain</center></h3>
                <img src="gain.gif" alt="Calories Needed for Weight Gain" style="width: 100%; height: 200px;">
                <p style="font-family: 'Verdana', sans-serif; font-size: 16px;">Calories Needed Daily for Weight Gain: ${gainCaloriesDaily} calories</p>
                <p style="font-family: 'Verdana', sans-serif; font-size: 16px;">Calories Needed Weekly for Weight Gain: ${gainCaloriesWeekly} calories</p>
                <canvas id="gainChart" width="400" height="200"></canvas>
            </div>
        </div>
        <div class="result-container">
            <div class="result-box">
                <h3 style="font-family: 'Verdana', serif; font-size: 25px;"><center>Muscle Growth Forecast</center></h3>
                <img src="muscle.gif" alt="Muscle Growth Forecast" style="width: 100%; height: 200px;">
                <p style="font-family: 'Verdana', sans-serif; font-size: 16px;">Estimated Muscle Gain Per Week: ${muscleGainPerWeek.toFixed(2)} kg</p>
                <p style="font-family: 'Verdana', sans-serif; font-size: 16px;">Estimated Muscle Gain Per Month: ${muscleGainPerMonth.toFixed(2)} kg</p>
                <canvas id="muscleGrowthChart" width="400" height="200"></canvas>
            </div>
            <div class="result-box">
                <h3 style="font-family: 'Verdana', serif; font-size: 25px;"><center>Health Tip</center></h3>
                <img src="heart.gif" alt="Health Tip" style="width: 100%; height: 200px;">
                <p style="font-family: 'Verdana', sans-serif; font-size: 16px;">${healthTip}</p>
				<canvas id="" width="400" height="1"></canvas>
            </div>
        </div>
    `;

    // Create a canvas element for the chart
    const calorieChartCanvas = document.getElementById('calorieChart');
    const gainChartCanvas = document.getElementById('gainChart');
    const muscleGrowthChartCanvas = document.getElementById('muscleGrowthChart');

    // Chart for Daily and Weekly Calorie Needs
    new Chart(calorieChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Daily', 'Weekly'],
            datasets: [{
                label: 'Calorie Needs',
                data: [dailyCalorieNeeds, weeklyCalorieNeeds],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart for Calories Needed for Weight Gain
    new Chart(gainChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Daily', 'Weekly'],
            datasets: [{
                label: 'Calories Needed for Weight Gain',
                data: [gainCaloriesDaily, gainCaloriesWeekly],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart for Muscle Growth Forecast
    new Chart(muscleGrowthChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Per Week', 'Per Month'],
            datasets: [{
                label: 'Muscle Growth Forecast',
                data: [muscleGainPerWeek.toFixed(2), muscleGainPerMonth.toFixed(2)],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
