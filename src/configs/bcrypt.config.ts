import bcrypt from 'bcrypt'

class BcryptHash {
  private rounds: number

  constructor(rounds: number) {
    this.rounds = rounds
  }

  public async hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.rounds)
    const hashed = await bcrypt.hash(plainText, salt)

    return hashed
  }

  public async compare(plainText: string, hashedText: string): Promise<boolean> {
    const result = await bcrypt.compare(plainText, hashedText)

    return result
  }
}

const bcryptHash = new BcryptHash(10)

export default bcryptHash
