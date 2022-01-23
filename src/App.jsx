import classNames from 'classnames'
import { useState } from 'react'


function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [result, setResult] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [clue, setClue] = useState(false)
  const [getAswear, setGetAnswer] = useState(false)
  const [trueAnswear, setTrueAnswear] = useState('')
  const [yourAswear, setYourAswear] = useState('')
  const [checkedAswear, setCheckedAswear] = useState(false)
  const [indexButton, setIndexButton] = useState(null)

  console.log(trueAnswear)
  console.log(yourAswear)



  const question = [
    {
      questionText: 'Столица России ?',
      answerOptions: [
        { answerText: 'Самара', isCorrect: false },
        { answerText: 'Москва', isCorrect: true },
        { answerText: 'Тверь', isCorrect: false },
        { answerText: 'Новосибирск', isCorrect: false },
      ]
    },
    {
      questionText: 'Столица США ?',
      answerOptions: [
        { answerText: 'Бостон', isCorrect: false },
        { answerText: 'Вашингтон', isCorrect: true },
        { answerText: 'Нью-Йорк', isCorrect: false },
        { answerText: 'Лос-Анджелес', isCorrect: false },
      ]
    }, {
      questionText: 'Столица Канады ?',
      answerOptions: [
        { answerText: 'Оттава', isCorrect: true },
        { answerText: 'Торонто', isCorrect: false },
        { answerText: 'Ванкувер', isCorrect: false },
        { answerText: 'Монреаль', isCorrect: false },
      ]
    },
    {
      questionText: 'Столица Австралии ?',
      answerOptions: [
        { answerText: 'Мельбурн', isCorrect: false },
        { answerText: 'Голд-Кост', isCorrect: false },
        { answerText: 'Сидней', isCorrect: false },
        { answerText: 'Канберра', isCorrect: true },
      ]
    },
    {
      questionText: 'Столица Китая ?',
      answerOptions: [
        { answerText: 'Шанхай', isCorrect: false },
        { answerText: 'Гуанчжоу', isCorrect: false },
        { answerText: 'Пекин', isCorrect: true },
        { answerText: 'Чунцин', isCorrect: false },
      ]
    }
  ]

  const nextQuestion = () => {

    if (currentQuestion + 1 >= question.length) {
      setShowResult(true)
    }

    setCurrentQuestion(currentQuestion + 1)
    setClue(false)
    setGetAnswer(false)
    setTrueAnswear('')
    setCheckedAswear(false)
    setIndexButton(null)
  }




  const checkedResult = (isCorrect, answear, index) => {

    setYourAswear(answear)
    setGetAnswer(true)

    if (currentQuestion + 1 >= question.length) {
      setShowResult(true)
    }

    if (isCorrect) {
      setResult(result + 1)
    }

    setTrueAnswear((question[currentQuestion].answerOptions.filter(el => el.isCorrect === true))[0].answerText)
    setClue(false)
    setCheckedAswear(true)
    setIndexButton(index)
  }






  const vuieClue = () => {
    setClue(!clue)
  }





  return (
    <div className="app">

      {showResult
        ? <h3>Вы ответили на {result} вопросов из {question.length} </h3>
        :
        (<div className="quiz">
          <div className='question'>
            <span>Кол-во вопросов {currentQuestion + 1} из {question.length}</span>
            <div>{question[currentQuestion].questionText}</div>

            <div onClick={vuieClue}>
              Получить подсказку
            </div>


            {clue
              ? <div>{(question[currentQuestion].answerOptions.filter(el => el.isCorrect === true))[0].answerText}</div>
              : null}


            <button disabled={getAswear ? "" : "disabled"} onClick={nextQuestion}>Следующий вопрос</button>


            {checkedAswear
              ? (<div>
                {trueAnswear !== yourAswear
                  ? <span>Вы ответили {yourAswear} и это не верно! Правильный ответ:{trueAnswear}</span>
                  : <span>Вы ответили верно!</span>
                }
              </div>)
            : null
             } 
         

          </div>

          <div className='answer'>
            {question[currentQuestion].answerOptions.map((answer, index) =>
              <button
                className={classNames({
                  'gg': trueAnswear === answer.answerText,
                  'zz': indexButton === index && trueAnswear !== answer.answerText
                })}
                disabled={getAswear ? "disabled" : ""}
                onClick={() => checkedResult(answer.isCorrect, answer.answerText, index)}
                key={index}>{answer.answerText}</button>
            )}
          </div>


        </div>
        )
      }


    </div>

  );
}

export default App;
