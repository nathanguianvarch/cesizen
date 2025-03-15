import Dockerode from "dockerode";

// Configuration pour la base de données
const POSTGRES_CONTAINER_NAME = "cesizen-postgres";
const POSTGRES_USER = "postgres";
const POSTGRES_PASSWORD = "postgres";
const POSTGRES_DB = "cesizen";
const POSTGRES_PORT = 5432;

// Initialisation du client Docker
const docker = new Dockerode();

// Fonction pour vérifier si le conteneur existe et s'il est en cours d'exécution
async function checkContainer() {
  try {
    const containers = await docker.listContainers({ all: true });
    const container = containers.find((container) =>
      container.Names.includes(`/${POSTGRES_CONTAINER_NAME}`)
    );

    if (!container) {
      console.log("Container does not exist. Creating a new one...");
      return { exists: false, running: false };
    }

    return {
      exists: true,
      running: container.State === "running",
      id: container.Id,
    };
  } catch (error) {
    console.error("Error checking container:", error);
    return { exists: false, running: false };
  }
}

// Fonction pour démarrer un conteneur existant
async function startContainer(containerId) {
  try {
    const container = docker.getContainer(containerId);
    await container.start();
    console.log("PostgreSQL container started successfully");
    return true;
  } catch (error) {
    console.error("Error starting container:", error);
    return false;
  }
}

// Fonction pour créer et démarrer un nouveau conteneur PostgreSQL
async function createContainer() {
  try {
    const container = await docker.createContainer({
      Image: "postgres:latest",
      name: POSTGRES_CONTAINER_NAME,
      Env: [
        `POSTGRES_USER=${POSTGRES_USER}`,
        `POSTGRES_PASSWORD=${POSTGRES_PASSWORD}`,
        `POSTGRES_DB=${POSTGRES_DB}`,
      ],
      HostConfig: {
        PortBindings: {
          "5432/tcp": [{ HostPort: `${POSTGRES_PORT}` }],
        },
      },
    });

    await container.start();
    console.log("New PostgreSQL container created and started successfully");
    return true;
  } catch (error) {
    console.error("Error creating container:", error);
    return false;
  }
}

// Fonction pour vérifier si l'image PostgreSQL existe, sinon la télécharger
async function checkAndPullImage() {
  try {
    const images = await docker.listImages();
    const postgresImage = images.find(
      (image) => image.RepoTags && image.RepoTags.includes("postgres:latest")
    );

    if (!postgresImage) {
      console.log("PostgreSQL image not found. Pulling from Docker Hub...");
      const stream = await docker.pull("postgres:latest");

      return new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err) => {
          if (err) {
            reject(err);
            return;
          }
          console.log("PostgreSQL image pulled successfully");
          resolve(true);
        });
      });
    }

    return true;
  } catch (error) {
    console.error("Error checking/pulling image:", error);
    return false;
  }
}

// Fonction principale qui initialise la base de données PostgreSQL
export async function initializePostgresContainer() {
  try {
    console.log("Checking Docker and PostgreSQL container...");

    // Vérifier et télécharger l'image PostgreSQL si nécessaire
    const imageReady = await checkAndPullImage();
    if (!imageReady) {
      throw new Error("Failed to prepare PostgreSQL image");
    }

    // Vérifier l'état du conteneur
    const { exists, running, id } = await checkContainer();

    if (exists && running) {
      console.log("PostgreSQL container is already running");
      return true;
    }

    if (exists && !running) {
      return await startContainer(id);
    }

    return await createContainer();
  } catch (error) {
    console.error("Failed to initialize PostgreSQL container:", error);
    return false;
  }
}

export default initializePostgresContainer;
