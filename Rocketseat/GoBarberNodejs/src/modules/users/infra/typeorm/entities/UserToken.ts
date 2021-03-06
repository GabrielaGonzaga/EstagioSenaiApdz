import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated} from "typeorm";

// class appointment
@Entity('user_tokens')
class UserToken  {
    //declare the atributes/params
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserToken;
