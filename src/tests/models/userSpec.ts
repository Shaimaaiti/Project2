
import { User, userController } from '../../models/user';

const user = new userController();
const postedUser:User={username:"username",hash_password:"password",email:"email@udacity.com",phone:"phone"} 
let newUser:User;
describe("User Model", () => {
    it('should have a create method', () => {
      expect(user.create).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(user.authenticate).toBeDefined();
      });
      beforeAll(async () => {
        newUser = await user.create(postedUser as User) 
       
   })
      it('create should return new created user', async () => {           
        expect((newUser).username).toEqual("username");
      });

      it('password should be hashed', async () => {     
         expect((newUser).hash_password).not.toBe("password");
       });
       it('creation date should be found', async () => {        
         expect((newUser).creation_date).not.toBe(undefined);
       });

       it('hashed password should be same', async () => {              
        const userpass= await user.authenticate(newUser.username,postedUser.hash_password);              
         expect((userpass as unknown as User).hash_password).not.toEqual(newUser.hash_password);
       });

       it('index should return []', async () => {
        const newusers = await user.index();       
        expect((newusers as unknown as User[] ).length).toBeGreaterThanOrEqual([].length);
      });
      it('show should return  user by id', async () => {        
        const result= await user.show(newUser.id as number)                
        expect((result as unknown as User ).username).toEqual(newUser.username);
      });
      it('delete should success', async () => {             
        const result= await user.delete(newUser.id as number)         
        expect((result as unknown as User ).username).toEqual(newUser.username);
      });

});
