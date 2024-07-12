export async function readBlobData(blobData: any) {
  const blob = await blobData.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      try {
        const text = reader.result as string;
        const jsonData = JSON.parse(text);
        resolve(jsonData);
      } catch (error: any) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the blob data."));
    };

    reader.readAsText(blob);
  });
}
