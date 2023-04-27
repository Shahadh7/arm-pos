import path from 'path';
import { DataTypes, Model, Sequelize } from 'sequelize';
declare const __static: string;

// todo try loading db from userData



const univDb = "../src/posdb.db"

// todo the below is the path to local db under src/pos.db
/* const isBuild = process.env.NODE_ENV === 'production';
const locDb = path.join(
    // eslint-disable-next-line
    isBuild ? __dirname : __static,
    '../src/pos.db',
);
 */

// setup the connection to make sure it works
const sequelize = new Sequelize({
    dialect: 'sqlite',
    // todo change this to locDb for using db inside src/pos.db
    storage: univDb,
    // ** db event logging true in dev and false in production
    logging: (process.env.NODE_ENV !== 'production') ? true : false,
    define: {
        timestamps: false,
        underscored: true,
    },
});

// todo define models here, or use a separate file for defining models and import them here!!!
class Shark extends Model {
    public sharktype!: string | null;
    public name!: string | null;
    public id!: number | null;
    public length!: number | null;
}


Shark.init({
    sharktype: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }

}, {
    tableName: "sharks",
    sequelize
})

// todo use sync to create tables 
Shark.sync()

export { sequelize, Shark };