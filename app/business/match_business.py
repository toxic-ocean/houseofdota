import datetime
import pytz

from app.models import Match
from app.business.slot_business import create_slot_from_json
from app.util.dota_util import GAME_MODES, LOBBY_TYPES


def create_from_json(match_json):
    utc = pytz.UTC
    match = Match(
        match_id=match_json['match_id'],
        match_seq_num=match_json['match_seq_num'],
        radiant_win=match_json['radiant_win'],
        duration=match_json['duration'],
        #pylint: disable=no-value-for-parameter
        start_time=utc.localize(datetime.datetime.fromtimestamp(match_json['start_time'])),
        patch=match_json['patch'],
        tower_status_radiant=match_json['tower_status_radiant'],
        tower_status_dire=match_json['tower_status_dire'],
        barracks_status_radiant=match_json['barracks_status_radiant'],
        barracks_status_dire=match_json['barracks_status_dire'],
        cluster=match_json['cluster'],
        first_blood_time=match_json['first_blood_time'],
        lobby_type=LOBBY_TYPES[match_json['lobby_type']],
        human_players=match_json['human_players'],
        leagueid=match_json['leagueid'],
        game_mode=GAME_MODES[match_json['game_mode']],
        flags=match_json['flags'],
        engine=match_json['engine'],
        radiant_score=match_json['radiant_score'],
        dire_score=match_json['dire_score'],
        skill=match_json['skill']
    )
    match.save()
    for slot_json in match_json['players']:
        create_slot_from_json(slot_json, match)
    return match


def get_heroes_list(match):
    return [slot.hero_id for slot in match.slots.all()]

#pylint: disable=invalid-name
def get_heroes_with_winning_team_info(match):
    team = 'radiant' if match.radiant_win else 'dire'
    return [(-slot.hero_id if slot.team == team else slot.hero_id)
            for slot in match.slots.all()]


def get_teams_heroes_list(match):
    teams = []
    for team in ['radiant', 'dire']:
        teams.append(
            sorted([slot.hero_id for slot in match.slots.filter(team=team)]))
    return teams


def get_winning_team_heroes_list(match):
    team = 'radiant' if match.radiant_win else 'dire'
    return sorted([slot.hero_id for slot in match.slots.filter(team=team)])
