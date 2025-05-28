export const elasticSearchHeaders = () => {
  const esHeaders = new Headers();
  esHeaders.append(
    "authorization",
    `ApiKey a3lGZl9aWUJkNXBlamZPVGNvY206aXVBSnZManNTMGVlQlAyMjkxZWRFUQ==`
  );
  esHeaders.append("Content-Type", "application/json");
  return esHeaders;
};

const host = "https://search.ecds.io";

export const recordsByType = async ({
  index,
  type,
}: {
  index: string;
  type: string;
}) => {
  const body = {
    query: {
      bool: {
        filter: [
          {
            term: {
              types: type,
            },
          },
        ],
        must: {
          match_all: {},
        },
      },
    },
    size: 250,
    from: 0,
  };

  const response = await fetch(`${host}/${index}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: elasticSearchHeaders(),
  });

  const data = await response.json();
  return data.hits.hits;
};

export const query = async ({ body, index }) => {
  const response = await fetch(`${host}/${index}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: elasticSearchHeaders(),
  });

  const data = await response.json();
  return data.hits.hits.map((hit) => hit._source);
};
