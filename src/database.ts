import path from 'path';
import { DataTypes, Model, Sequelize } from 'sequelize';
declare const __static: string;
import moment from "moment"

const univDb = "../src/arm_db.db"

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
    dialectModule: require('sqlite3'),
    // todo change this to locDb for using db inside src/pos.db
    storage: univDb,
    // ** db event logging true in dev and false in production
    logging: (process.env.NODE_ENV !== 'production') ? true : false,
    define: {
        underscored: true,
        // timestamps: true,
    },
});

const dropTables = async () => {
    await sequelize.drop()
}

// dropTables()

const createTables = async () => {
    await sequelize.sync()
}

// todo define models here, or use a separate file for defining models and import them here!!!
class Shark extends Model {}

class User extends Model {}

class Customer extends Model {}

class Repair extends Model {}

class Invoice extends Model {}

class Payment extends Model {}

class Purchase extends Model {}

class Sale extends Model {}

class Setting extends Model {}

class Status extends Model {}

class Stock extends Model {}

class PreCheck extends Model {}

class RepairType extends Model {}

class Brand extends Model {}

class PhoneModel extends Model {}

class RepairStock extends Model {}


Shark.init({
    sharktype: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

},{
    defaultScope: {
        attributes: { exclude: ['id'] },
    },
    scopes: {
        withId: {
            attributes: { include: ['id'] },
        },
    },
    tableName: "sharks",
    sequelize,
    timestamps: false
}
)

User.init({
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    full_name: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },


}, {
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] },
        },
    },
    tableName: "users",
    sequelize,
    timestamps: false

})

Customer.init({
    id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: "customers",
    sequelize,
    timestamps: false
})

Status.init({
    id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: "statuses",
    sequelize,
    timestamps: false
})

RepairType.init({
    id_repair_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    repair_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: "repair_types",
    sequelize,
    timestamps: false
})

Brand.init({
    id_brand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: "brands",
    sequelize,
    timestamps: false
})

PhoneModel.init({
    id_phone_model: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    phone_model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_brand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brand,
            key: 'id_brand',
        },
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: "phone_models",
    sequelize,
    timestamps: false
})

Setting.init({
    id_setting: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    default_theme: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

}, {
    tableName: "settings",
    sequelize,
    timestamps: false
})

Purchase.init({
    id_purchase: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user',
        },
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },


}, {
    tableName: "purchases",
    sequelize,
    timestamps: false
})

Stock.init({
    id_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    item_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_brand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brand,
            key: 'id_brand',
        },
    },
    id_phone_model: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PhoneModel,
            key: 'id_phone_model',
        },
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },


}, {
    tableName: "stocks",
    sequelize,
    timestamps: false
})

PreCheck.init({
    id_pre_check: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },


}, {
    tableName: "pre_checks",
    sequelize,
})

Repair.init({
    id_repair: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    id_repair_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RepairType,
            key: 'id_repair_type',
        },
    },
    repair_code: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
    id_brand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brand,
            key: 'id_brand',
        },
    },
    id_phone_model: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PhoneModel,
            key: 'id_phone_model',
        },
    },
    task_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imei_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'id_customer',
        },
    },
    id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key: 'id_status',
        },
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },


}, {
    tableName: "repairs",
    sequelize,
    timestamps: false
})

RepairStock.init({
    id_repair: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Repair,
            key: 'id_repair',
        },
    },
    id_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Stock,
            key: 'id_stock',
        },
    },
    item_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "repair_stocks",
    sequelize,
})


Invoice.init({
    id_invoice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    invoice_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    id_repair: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Repair,
            key: 'id_repair',
        },
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user',
        },
    },
    id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'id_customer',
        },
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },


}, {
    tableName: "invoices",
    sequelize,
    timestamps: false
})

Payment.init({
    id_payment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    id_invoice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Invoice,
            key: 'id_invoice',
        },
    },
    id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'id_customer',
        },
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },


}, {
    tableName: "payments",
    sequelize,
    timestamps: false
})

Brand.hasMany(PhoneModel, {
    foreignKey: 'id_brand',
    as: 'phone_models',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

PhoneModel.belongsTo(Brand, {
    foreignKey: 'id_brand',
    as: 'brand',
})

// Purchase.hasOne(User, {
//     foreignKey: 'id_user',
//     as: 'user',
// })

Stock.belongsToMany(Purchase, {through: 'purchase_stock', foreignKey: 'id_stock'})

Purchase.belongsToMany(Stock, {through: 'purchase_stock', foreignKey: 'id_purchase'})

Repair.belongsToMany(PreCheck, {through: 'repair_pre_check', foreignKey: 'id_repair'})

PreCheck.belongsToMany(Repair, {through: 'repair_pre_check', foreignKey: 'id_pre_check'})

Repair.hasOne(RepairType, {
    foreignKey: 'id_repair_type',
    as: 'repair_type',
})

Repair.hasOne(Brand, {
    foreignKey: 'id_brand',
    as: 'brand',
})

Repair.hasOne(PhoneModel, {
    foreignKey: 'id_phone_model',
    as: 'phone_model',
})

Repair.hasOne(Customer, {
    foreignKey: 'id_customer',
    as: 'customer',
})

Repair.hasOne(Status, {
    foreignKey: 'id_status',
    as: 'status',
})


Repair.belongsToMany(Stock, {through: 'repair_stocks', foreignKey: 'id_repair'})

Stock.belongsToMany(Repair, {through: 'repair_stocks', foreignKey: 'id_stock'})

Payment.belongsTo(Invoice, {
    foreignKey: 'id_invoice',
    as: 'invoice',
})

Payment.belongsTo(Customer, {
    foreignKey: 'id_customer',
    as: 'customer',
})

Invoice.belongsTo(Repair, {
    foreignKey: 'id_repair',
    as: 'repair',
})

Invoice.hasOne(Payment, {
    foreignKey: 'id_invoice',
    as: 'payment',
})

Invoice.belongsTo(Customer, {
    foreignKey: 'id_customer',
    as: 'customer',
})

Repair.hasOne(Invoice, {
    foreignKey: 'id_repair',
    as: 'invoice',
})



// todo use sync to create tables
// dropTables()
// createTables()


export { sequelize, Shark, Brand, PhoneModel, Purchase, Stock, Repair, RepairType, PreCheck, Customer, Status, RepairStock, Invoice, Payment, User };