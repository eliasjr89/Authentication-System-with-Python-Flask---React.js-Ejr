"""empty message

Revision ID: e275cf752bef
Revises: e9f224f86bbd
Create Date: 2023-06-20 02:43:18.133663

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e275cf752bef'
down_revision = 'e9f224f86bbd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedidos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('platos_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'platos', ['platos_id'], ['plato_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedidos', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('platos_id')

    # ### end Alembic commands ###
