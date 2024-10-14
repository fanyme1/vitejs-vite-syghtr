import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ExerciseDetails {
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  instructions: string[];
}

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<ExerciseDetails | null>(null);
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, {
          headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey
          }
        });
        setExercise(response.data);
      } catch (error) {
        console.error('Error fetching exercise details:', error);
      }
    };

    if (id) {
      fetchExerciseDetails();
    }
  }, [id, apiKey]);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="exercise-detail">
      <h2>{exercise.name}</h2>
      <img src={exercise.gifUrl} alt={exercise.name} className="exercise-gif" />
      <div className="exercise-info">
        <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
        <p><strong>Equipment:</strong> {exercise.equipment}</p>
        <p><strong>Target Muscle:</strong> {exercise.target}</p>
      </div>
      <div className="exercise-instructions">
        <h3>Instructions:</h3>
        <ol>
          {exercise.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ExerciseDetail;