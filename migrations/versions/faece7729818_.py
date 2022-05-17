"""empty message

Revision ID: faece7729818
Revises: 03b939374eb6
Create Date: 2022-05-17 21:35:00.218666

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'faece7729818'
down_revision = '03b939374eb6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('projects', sa.Column('pictures', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('projects', 'pictures')
    # ### end Alembic commands ###
