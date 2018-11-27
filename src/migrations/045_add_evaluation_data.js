const archives = ['Tugas', 'Kisi - Kisi', 'Ujian'];

export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'evaluations',
      archives.map(type => ({
        type,
        created_at: new Date(),
        updated_at: new Date()
      }))
    ),
  down: queryInterface => queryInterface.bulkDelete('evaluations', null, {})
};
