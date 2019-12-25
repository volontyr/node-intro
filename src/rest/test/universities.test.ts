describe('Universities integration tests', () => {
  const mockUniversity = {name: "NAUSHNIK", city: "Kyiv"};
  console.info('TEST RUN');
  it('getAllUniversities should return an array of university objects', async () => {
    console.info('TEST GET ALL');
    const universities = await fetch(`${process.env.SERVER_HOST}/universities`);
    console.log(universities);
  });
});