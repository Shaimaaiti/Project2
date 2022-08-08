
import { User, userController } from '../../models/user';

const user = new userController();
const postedUser:User={username:"username",hash_password:"password",email:"email",phone:"phone"} 
describe("User Model", () => {
    it('should have a create method', () => {
      expect(user.create).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(user.authenticate).toBeDefined();
      });

      it('create should return new created user', async () => {
        const newuser = await user.create(postedUser);       
        expect((newuser as unknown as User ).username).toEqual("username");
      });

      it('password should be hashed', async () => {
        const newuser = await user.create(postedUser);
         expect((newuser as unknown as User ).hash_password).not.toBe("password");
       });
       it('creation date should be found', async () => {
        const newuser = await user.create(postedUser);
         expect((newuser as unknown as User ).creation_date).not.toBe(undefined);
       });

       it('hashed password should be same', async () => {
        const newuser = await user.create(postedUser);       
        const userpass= await user.authenticate(newuser.username,postedUser.hash_password);              
         expect((userpass as unknown as User).hash_password).not.toEqual(newuser.hash_password);
       });

       it('index should return []', async () => {
        const newusers = await user.index();       
        expect((newusers as unknown as User[] ).length).toBeGreaterThanOrEqual([].length);
      });
      it('show should return  user by id', async () => {
        const newuser = await user.create(postedUser);  
        const result= await user.show(newuser.id as number)                
        expect((result as unknown as User ).username).toEqual(newuser.username);
      });
      it('delete should success', async () => {
        const newuser = await user.create(postedUser);       
        const result= await user.delete(newuser.id as number)         
        expect((result as unknown as User ).username).toEqual(newuser.username);
      });

});
