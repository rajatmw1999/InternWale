function isEqual(storedJob, newJob) {
  if (!storedJob.Title && storedJob.Title !== newJob.Title) return false;
  if (!storedJob.Location && storedJob.Location !== newJob.Location)
    return false;
  if (
    !storedJob.LinktoJobPost &&
    storedJob.LinktoJobPost !== newJob.LinktoJobPost
  )
    return false;
  return true;
}
module.exports = isEqual;
