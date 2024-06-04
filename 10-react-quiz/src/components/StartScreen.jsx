function StartScreen({ numQuestions, dispatch }) {
    return (
        <div className='start'>
            <h2>Welcome To The React Quiz !</h2>
            <h3> {numQuestions} question to test your React mastery</h3>
            <button
                className='btn btn-ui'
                onClick={() => dispatch({ type: "start" })}>
                Let's Start
            </button>
        </div>
    );
}

export default StartScreen;
