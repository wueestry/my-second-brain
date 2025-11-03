---
{"publish":true,"title":"Branch Prediction","created":"2025-09-02 14:15","modified":"2025-11-03T20:35:04.871+01:00","tags":["computer-science/computer-architecture/branch-prediction"],"cssclasses":"center-images"}
---


# BRANCH PREDICTION

---

Branch prediction is a performance optimisation technique used in modern processors to speculatively guess the outcome of conditional branch instructions before they are resolved. By predicting which path of execution to follow, processors can avoid pipeline stalls and maintain high instruction throughput.

## Purpose

In pipelined processors, instructions are processed in stages (fetch, decode, execute, etc.). When a conditional branch is encountered, the processor doesn't immediately know which instruction to fetch next until the branch condition is evaluated. Waiting for this evaluation causes **pipeline stalls**, wasting CPU cycles.

Branch prediction addresses this by:

- Guessing the likely outcome (taken or not taken)
- Speculatively fetching and executing instructions along the predicted path
- Rolling back if the prediction was incorrect (flushing the pipeline)

## Types of Branch Predictors

### Static Prediction

Simple fixed strategies:

- **Always taken**: Assume all branches are taken
- **Always not taken**: Assume all branches are not taken
- **Backward taken, forward not taken**: Based on typical loop behavior

### Dynamic Prediction

Adaptive strategies that learn from execution history:

- **One-bit predictor**: Remembers the last outcome for each branch
- **Two-bit saturating counter**: Requires two consecutive mispredictions to change prediction
- **Correlating predictor**: Considers outcomes of other branches
- **Tournament predictor**: Combines multiple predictors and selects the best performer

## Performance Impact

Branch prediction accuracy significantly affects performance:

- **Good prediction (>95% accuracy)**: Minimal performance penalty
- **Poor prediction (<80% accuracy)**: Frequent pipeline flushes, significant slowdown
- **Critical for loops and if-statements**: Common patterns in most programs

## Misprediction Penalty

When a prediction is wrong:

1. The speculatively executed instructions are discarded
2. The pipeline is flushed
3. Execution restarts from the correct branch target
4. Typical penalty: 10-20 clock cycles on modern processors

## Implications for Programming

Branch prediction affects code performance:

- **Predictable branches**: Loops and consistent conditionals perform well
- **Unpredictable branches**: Random data or irregular patterns cause frequent mispredictions
- **Branch-free code**: Techniques like branchless programming can avoid prediction issues
- **Data sorting**: Sorted data often leads to better branch prediction in search/filter operations

## Modern Implementations

Advanced branch predictors in modern CPUs:

- **Perceptron-based predictors**: Use neural network concepts
- **TAGE (TAgged GEometric) predictors**: Multiple history lengths
- **Hybrid predictors**: Combine multiple prediction strategies
- **Return address stack**: Special prediction for function returns

---

## References

- Hennessy, J. L., & Patterson, D. A. (2017). _Computer Architecture: A Quantitative Approach_ (6th ed.). Morgan Kaufmann.
- Patterson, D. A., & Hennessy, J. L. (2020). _Computer Organization and Design: The Hardware/Software Interface_ (6th ed.). Morgan Kaufmann.
- [Branch predictor - Wikipedia](https://en.wikipedia.org/wiki/Branch_predictor)
- Smith, J. E. (1981). "A Study of Branch Prediction Strategies." _Proceedings of the 8th Annual Symposium on Computer Architecture_, 135-148.
