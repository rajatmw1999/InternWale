function isEqual(storedJob, newJob) {
  if (newJob.Title !== null && storedJob.Title !== newJob.Title) return false;
  if (newJob.Location !== null && storedJob.Location !== newJob.Location)
    return false;
  if (storedJob.LinktoJobPost !== newJob.LinktoJobPost) return false;
  return true;
}
module.exports = isEqual;
