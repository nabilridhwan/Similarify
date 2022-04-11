export default class Parameter {
    constructor(name, description, initialValue, inputMin, inputMax, outputMin, outputMax, step, times = 100) {
        this.name = name;
        this.description = description;
        this.value = initialValue;
        this.inputMin = inputMin;
        this.inputMax = inputMax;
        this.outputMin = outputMin;
        this.outputMax = outputMax;
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
        return this.mappedValue()
    }

    mappedValue() {
        return (this.value - this.inputMin) * (this.outputMax - this.outMin) / (this.inputMax - this.inputMin) + this.outputMin;
    }
}