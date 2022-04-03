from flask_login import UserMixin, current_user
from datetime import datetime
from flask import Blueprint, redirect, flash, url_for
from sqlalchemy import Table, Column, Integer, String, Float, Boolean, Date, DateTime, ForeignKey
from sqlalchemy.orm import declared_attr, relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

created_game = Table('attending_game', Base.metadata, Column('user_id', ForeignKey('user.user_id')), Column('game_id', ForeignKey('game.game_id')))
team_comprised_of = Table('team_comprised_of', Base.metadata, Column('user_id', ForeignKey('user.user_id')), Column('team_id', ForeignKey('team.team_id')))
signs_up_for = Table('signs_up_for', Base.metadata, Column('user_id', ForeignKey('user.user_id')), Column('game_id', ForeignKey('game.game_id')))

class User(Base, UserMixin):
    __tablename__ = 'user'

    user_id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    password_hash = Column(String)
    football_select = Column(Boolean)
    golf_select = Column(Boolean)
    basketball_select = Column(Boolean)
    soccer_select = Column(Boolean)
    other_select = Column(Boolean)

    ### Relationships
    games = relationship('Game', secondary=created_game)
    teams_on = relationship('Team', secondary=team_comprised_of)
    attending = relationship('Game', secondary=signs_up_for)    

class Game(Base):
    __tablename__ = 'game'

    game_id = Column(Integer, primary_key=True)
    game_name = Column(String)
    sport = Column(String)
    date = Column(DateTime)
    players_needed = Column(Integer)
    open_time = Column(DateTime)
    close_time = Column(DateTime)

class Location(Base):
    __tablename__ = 'location'

    location_id = Column(Integer, primary_key=True)
    address = Column(String)
    open_time = Column(DateTime)
    close_time = Column(DateTime)

class Team(Base):
    __tablename__ = 'team'

    team_id = Column(Integer, primary_key=True)
    sport = Column(String)
    team_name = Column(String)
    roster_spots = Column(Integer)