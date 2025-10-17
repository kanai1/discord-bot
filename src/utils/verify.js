function verifyMaster(userId) {
    const masterUserId = process.env.MASTER_ID;

    return userId == masterUserId;
}