import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    status: faker.helpers.shuffle([
      "relationship",
      "complicated",
      "single",
      "divorced",
    ])[0],
  };
};

export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(10000);

export async function fetchData(options) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: data.length, // Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  };
}
