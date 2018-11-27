import { Evaluation } from 'models';

export async function EvaluationFactory(evaluationData) {
  const data = [
    { type: 'Tugas' },
    { type: 'Kisi - Kisi' },
    { type: 'Ujian' },
    ...(evaluationData || {}),
  ];

  return Evaluation.bulkCreate(data);
}

export default EvaluationFactory;
