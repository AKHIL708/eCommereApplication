const handleErorrAndResponse = (result, res) => {
  // console.log("error result : ", result);
  if (result == null) {
    return res.status(200).json({
      messageOne:
        "check the params or id (cause no data with provided details)",
      messageTwo: "check the object keys properly {column , value}",
      result: "no data found !",
    });
  }

  if (!result.err) {
    return res.status(200).json({
      message: "success",
      result: result,
    });
  } else {
    console.error(result); // Log the error details
    return res.status(500).json({
      message: "Internal Server Error",
      error: result,
    });
  }
};
module.exports = handleErorrAndResponse;
