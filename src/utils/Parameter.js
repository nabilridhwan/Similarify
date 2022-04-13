export default class Parameter {
    constructor(name, description, initialValue, min, max, step, times = 100) {
        this.name = name;
        this.description = description;
        this.value = initialValue;
        this.min = min;
        this.max = max;
        this.step = step;
        this.times = times;
    }

    // Check if this parameter is the same as some other parameter
    isTheSameAs(otherParameterName) {
        return this.name === otherParameterName;
    }

    // Sets the value
    setValue(newValue) {
        this.value = newValue;
    }

    // Shows the value for display
    getDisplayValue() {
        return this.value * this.times;
    }

    // Gets the actual value
    getValue() {
        return this.value;
    }

}