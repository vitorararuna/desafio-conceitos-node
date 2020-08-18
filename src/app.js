const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid repository ID' });
  }

  return next();
}

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO

  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo);
  return response.json(repo);

});

app.put("/repositories/:id", validateRepositoryId, (request, response) => {
  // TODO

  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" })
  }

  const likes = repositories[repoIndex].likes;

  const repo = { id, title, url, techs, likes }

  repositories[repoIndex] = repo;

  return response.json(repo);
});

app.delete("/repositories/:id", validateRepositoryId, (request, response) => {
  // TODO

  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" })
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", validateRepositoryId, (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" })
  }

  const { title, url, techs, likes } = repositories[repoIndex];
  const repo = { id, title, url, techs, likes: likes + 1 };

  repositories[repoIndex] = repo;

  return response.json(repo);
});

module.exports = app;
