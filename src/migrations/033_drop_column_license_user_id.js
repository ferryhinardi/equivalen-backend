export default {
  up: (queryInterface) => {
    queryInterface.removeColumn('licenses', 'user_id');
  },
  down: () => {}
};
