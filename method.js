//try and catch method
exports.updateTour = async (req, res) => {
  try {
    // eslint-disable-next-line no-use-before-define
    const tour = await tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
