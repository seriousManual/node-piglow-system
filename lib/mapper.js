var THRESHOLDS = [
    0.15, 0.3, 0.45, 0.6, 0.75, 0.9
];

/**
 * maps a arbitrary value to an piglow index arm
 * @param indexArm
 * @param value
 * @param brightness
 * @param piGlow
 */

function mapValue(indexArm, value, brightness, piGlow) {
    THRESHOLDS
        .map(function(threshold, index) {
            var prevThreshold = index > 0 ? THRESHOLDS[index - 1] : 0;

            if(value > prevThreshold) {
                if(value >= threshold) {
                    return 1;
                } else {
                    return (value - prevThreshold) / (threshold - prevThreshold);
                }
            } else {
                return 0;
            }
        })
        .reverse()
        .forEach(function(value, indexLed) {
            piGlow['l_' + indexArm + '_' + indexLed] = parseInt(value * brightness, 10);
        });

}

module.exports = mapValue;