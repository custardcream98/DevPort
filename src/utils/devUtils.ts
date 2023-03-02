const logOnDev = (message: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
};

export { logOnDev };
