import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';

function ReadGrading() {
  const [gradingList, setGradingList] = useState([]);
  const [scoreList, setScoreList] = useState(new Map());

  const { grading_status_id } = useParams();

  const fetchGrading = async (scoreList) => {
    const res = await instance.get(`/grading/${grading_status_id}`);
    setGradingList(res.data);

    res.data.forEach((data) => {
      scoreList.set(data.grading_standard.id, data.score);
    });
    setScoreList(scoreList);
  };

  const renderGrading = (gradingList, scoreList) => {
    return gradingList.map((grading) => {
      const standard = grading.grading_standard;

      return [
        <div>
          <p>{standard.gradingStandard}</p>
          <div>
            <label>
              <input
                type={'radio'}
                onChange={(event) =>
                  handleScoreClick(event, standard.id, scoreList, grading.id)
                }
                checked={scoreList.get(standard.id) === 1}
                value={1}
                name={`standard${standard.id}`}
              />
              1점
            </label>
            <label>
              <input
                type={'radio'}
                onChange={(event) =>
                  handleScoreClick(event, standard.id, scoreList, grading.id)
                }
                checked={scoreList.get(standard.id) === 2}
                value={2}
                name={`standard${standard.id}`}
              />
              2점
            </label>
            <label>
              <input
                type={'radio'}
                onChange={(event) =>
                  handleScoreClick(event, standard.id, scoreList, grading.id)
                }
                checked={scoreList.get(standard.id) === 3}
                value={3}
                name={`standard${standard.id}`}
              />
              3점
            </label>
            <label>
              <input
                type={'radio'}
                onChange={(event) =>
                  handleScoreClick(event, standard.id, scoreList, grading.id)
                }
                checked={scoreList.get(standard.id) === 4}
                value={4}
                name={`standard${standard.id}`}
              />
              4점
            </label>
            <label>
              <input
                type={'radio'}
                onChange={(event) =>
                  handleScoreClick(event, standard.id, scoreList, grading.id)
                }
                checked={scoreList.get(standard.id) === 5}
                value={5}
                name={`standard${standard.id}`}
              />
              5점
            </label>
          </div>
        </div>,
      ];
    });
  };

  const handleScoreClick = async (
    event,
    standard_id,
    scoreList,
    grading_id
  ) => {
    const value = Number(event.target.value);
    setScoreList(new Map([...scoreList, [standard_id, value]]));

    const res = await instance.put(`/grading/${grading_id}`, {
      score: value,
    });
    console.log(res.data);
  };

  useEffect(() => {
    fetchGrading(scoreList);
  }, []);

  return (
    <div>
      <p>점수를 바꾸면 자동으로 반영됩니다.</p>
      <div>{renderGrading(gradingList, scoreList)}</div>
    </div>
  );
}

export default ReadGrading;
