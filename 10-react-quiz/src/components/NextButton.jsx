function NextButton({ dispatch, answer, numQuestion, index }) {
    if (answer === null) return null;
    if (index < numQuestion - 1)
        return (
            <div>
                <button
                    className='btn btn-ui'
                    onClick={() => dispatch({ type: "nextQuestion" })}>
                    Next
                </button>
            </div>
        );

    if (index === numQuestion - 1)
        return (
            <div>
                <button
                    className='btn btn-ui'
                    onClick={() => dispatch({ type: "finish" })}>
                    Finish
                </button>
            </div>
        );
}

export default NextButton;
