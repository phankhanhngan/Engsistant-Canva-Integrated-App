import * as React from 'react';
import {
  Button,
  SelectOption,
  Select,
  LoadingIndicator,
  Rows,
  Box,
  Title,
  Badge,
  Avatar,
} from '@canva/app-ui-kit';
import styles from 'styles/components.css';
import { addPage } from '@canva/design';
import { auth } from '@canva/user';
import { fetchClasses, fetchLessons, fetchUser } from './api-utils';
import { AxiosResponse } from 'axios';
import { ClassInfo, Lesson, UserProfile } from './types';
import styled from 'styled-components';
import { Empty } from 'antd';
import { Font, upload } from '@canva/asset';
import { findFonts } from '@canva/asset';
// import { Select } from 'antd';

export function App() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [classList, setClassList] = React.useState<SelectOption<string>[]>([]);
  const [lessonList, setLessonList] = React.useState<Lesson[]>([]);
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [classId, setClassId] = React.useState<string>(
    classList.length !== 0 ? classList[0].value : '',
  );
  const [userProfile, setUserProfile] = React.useState<UserProfile>();
  const [font, setFont] = React.useState<Font | undefined>();

  async function handleClick(item: Lesson) {
    const synonymsProps = (synonyms: string[]) => {
      return synonyms.map((item, index) => ({
        type: 'TEXT',
        children: [item],
        width: 300,
        top: 443.6,
        left: 150 + 330 * index,
        fontSize: 35,
        color: '#96B3C2',
        fontWeight: 'medium',
        fontRef: font?.ref,
      }));
    };
    const examplesVocabProps = (examples: string[]) => {
      return examples.map((item, index) => ({
        type: 'TEXT',
        children: [item],
        width: 1700,
        top: 812.6 + 50 * index,
        left: 150,
        fontSize: 35,
        color: '#000000',
        fontWeight: 'medium',
        fontRef: font?.ref,
      }));
    };
    const examplesGrammarProps = (examples: string[]) => {
      return examples.map((item, index) => ({
        type: 'TEXT',
        children: [item],
        width: 1700,
        top: 668.3 + 50 * index,
        left: 150,
        fontSize: 35,
        color: '#000000',
        fontWeight: 'medium',
        fontRef: font?.ref,
      }));
    };

    const antonymsProps = (antonyms: string[]) => {
      return antonyms.map((item, index) => ({
        type: 'TEXT',
        children: [item],
        width: 300,
        top: 624.6,
        left: 150 + 330 * index,
        fontSize: 35,
        color: '#CBAABC',
        fontWeight: 'medium',
        fontRef: font?.ref,
      }));
    };

    try {
      setIsLoading(true);
      const image = await upload({
        type: 'IMAGE',
        mimeType: 'image/jpeg',
        url: item.cover,
        thumbnailUrl: item.cover,
      });

      // first page
      await addPage({
        background: {
          color: '#96B3C2',
        },
        elements: [
          {
            type: 'IMAGE',
            ref: image.ref,
            height: 858.2,
            width: 1920,
            left: 0,
            top: 0,
          },
          {
            type: 'TEXT',
            children: [item.name],
            width: 1800,
            left: 75,
            top: 858.2,
            color: '#ffffff',
            fontSize: 98,
            rotation: 0,
            fontRef: font?.ref,
            fontWeight: 'bold',
          },
          {
            type: 'TEXT',
            children: [item.description],
            width: 1500,
            left: 75,
            top: 975.6,
            color: '#ffffff',
            fontSize: 37,
            rotation: 0,
          },
        ],
      });
      let vocabIndex = 0;
      let selectedItems = item.vocabularies.slice(vocabIndex, vocabIndex + 3);
      await Promise.all(
        selectedItems.map(async (item) => {
          return await addPage({
            background: {
              color: '#ffffff',
            },
            elements: [
              {
                type: 'TEXT',
                children: ['Vocabulary'],
                width: 800,
                left: 752.7,
                top: 23.9,
                color: '#97C1A9',
                fontSize: 80,
                fontWeight: 'bold',
                fontRef: font?.ref,
              },
              {
                type: 'TEXT',
                children: [
                  `${item.word} (${item.functionalLabel}) /${item.pronunciationWritten}/`,
                ],
                width: 1200,
                top: 185.2,
                left: 109.3,
                fontSize: 40,
                color: '#000000',
                fontWeight: 'bold',
                fontRef: font?.ref,
              },
              {
                type: 'TEXT',
                children: [item.meaning],
                width: 1800,
                top: 250,
                left: 109.3,
                fontSize: 40,
                color: '#000000',
                fontWeight: 'medium',
                fontRef: font?.ref,
              },
              {
                type: 'TEXT',
                children: ['Synonyms'],
                width: 300,
                top: 376.6,
                left: 109.3,
                fontSize: 40,
                color: '#CBAABC',
                fontWeight: 'bold',
                fontRef: font?.ref,
              },
              {
                type: 'TEXT',
                children: ['Examples'],
                width: 300,
                top: 745.6,
                left: 109.3,
                fontSize: 40,
                color: '#97C1A9',
                fontWeight: 'bold',
                fontRef: font?.ref,
              },
              {
                type: 'TEXT',
                children: ['Antonyms'],
                width: 300,
                top: 559.6,
                left: 109.3,
                fontSize: 40,
                color: '#96B3C2',
                fontWeight: 'bold',
                fontRef: font?.ref,
              },
              {
                type: 'TEXT',
                children: [
                  '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
                ],
                width: 1779.7,
                top: 302.8,
                left: 108,
                fontSize: 20,
                color: '#B1CEDD',
                fontWeight: 'bold',
                fontRef: font?.ref,
              },
              ...synonymsProps(item.synonymMeta),
              ...antonymsProps(item.antonymMeta),
              ...examplesVocabProps(item.exampleMeta),
            ],
          });
        }),
      );
      vocabIndex += 3;
      let grammarIndex = 0;
      const vocabInterval = setInterval(async () => {
        selectedItems = item.vocabularies.slice(vocabIndex, vocabIndex + 3);
        await Promise.all(
          selectedItems.map(async (item) => {
            return await addPage({
              background: {
                color: '#ffffff',
              },
              elements: [
                {
                  type: 'TEXT',
                  children: ['Vocabulary'],
                  width: 800,
                  left: 752.7,
                  top: 23.9,
                  color: '#97C1A9',
                  fontSize: 80,
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: [
                    `${item.word} (${item.functionalLabel}) /${item.pronunciationWritten}/`,
                  ],
                  width: 1200,
                  top: 185.2,
                  left: 109.3,
                  fontSize: 40,
                  color: '#000000',
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: [item.meaning],
                  width: 1800,
                  top: 250,
                  left: 109.3,
                  fontSize: 40,
                  color: '#000000',
                  fontWeight: 'medium',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: ['Synonyms'],
                  width: 300,
                  top: 376.6,
                  left: 109.3,
                  fontSize: 40,
                  color: '#CBAABC',
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: ['Examples'],
                  width: 300,
                  top: 745.6,
                  left: 109.3,
                  fontSize: 40,
                  color: '#97C1A9',
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: ['Antonyms'],
                  width: 300,
                  top: 559.6,
                  left: 109.3,
                  fontSize: 40,
                  color: '#96B3C2',
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: [
                    '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
                  ],
                  width: 1779.7,
                  top: 302.8,
                  left: 108,
                  fontSize: 20,
                  color: '#B1CEDD',
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                ...synonymsProps(item.synonymMeta),
                ...antonymsProps(item.antonymMeta),
                ...examplesVocabProps(item.exampleMeta),
              ],
            });
          }),
        );
        vocabIndex += 3;
        if (vocabIndex >= item.vocabularies.length) {
          clearInterval(vocabInterval);
        }
      }, 10000);
      const grammarInterval = setInterval(async () => {
        const selectedItems = item.grammars.slice(
          grammarIndex,
          grammarIndex + 3,
        );
        // Grammar page
        await Promise.all(
          selectedItems.map(async (item, index) => {
            return await addPage({
              background: {
                color: '#ffffff',
              },
              elements: [
                {
                  type: 'TEXT',
                  children: ['Grammar'],
                  width: 800,
                  left: 752.7,
                  top: 23.9,
                  color: '#97C1A9',
                  fontSize: 80,
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: [item.name],
                  width: 1200,
                  top: 243.2,
                  left: 109.3,
                  fontSize: 40,
                  color: '#000000',
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: ['Usage'],
                  width: 300,
                  top: 331.6,
                  left: 109.3,
                  fontSize: 40,
                  color: '#CBAABC',
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: [item.usage],
                  width: 1700,
                  top: 389,
                  left: 150,
                  fontSize: 35,
                  color: '#000000',
                  fontWeight: 'medium',
                  fontRef: font?.ref,
                },
                {
                  type: 'TEXT',
                  children: ['Example'],
                  width: 282,
                  top: 598.3,
                  left: 109.3,
                  fontSize: 40,
                  color: '#97C1A9',
                  fontWeight: 'bold',
                  fontRef: font?.ref,
                },
                ...examplesGrammarProps(item.exampleMeta),
              ],
            });
          }),
        );
        grammarIndex += 3;
        if (grammarIndex >= item.grammars.length) {
          clearInterval(grammarInterval);
        }
      }, 10000);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getClassList = async () => {
    try {
      setIsLoading(true);
      const res: AxiosResponse<{ classes: ClassInfo[] }, any> =
        await fetchClasses();
      const selectOptions: SelectOption<string>[] = res.data.classes.map(
        (item) => ({ value: item.id, label: item.name }),
      );
      if (selectOptions.length !== 0) setClassId(selectOptions[0].value);
      setClassList(selectOptions);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLessonList = async (classId: string) => {
    try {
      setIsLoading(true);
      const res: AxiosResponse<{ lessons: Lesson[] }, any> = await fetchLessons(
        classId,
      );
      console.log(res.data.lessons);
      setLessonList(res.data.lessons);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res: AxiosResponse<{ user: UserProfile }, any> = await fetchUser();
      console.log(res.data.user);
      if (res.data.user !== null) {
        setUserProfile(res.data.user);
        setIsAuthorized(true);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFont = async (name: string) => {
    const { fonts } = await findFonts();
    const font = fonts.find((item) => item.name == name);
    setFont(font);
  };

  React.useEffect(() => {
    getUser();
  }, [isAuthorized]);

  React.useEffect(() => {
    if (isAuthorized) {
      getClassList();
    }

    getFont('Montserrat');
  }, [isAuthorized]);

  React.useEffect(() => {
    if (classId && isAuthorized) getLessonList(classId);
  }, [classId, isAuthorized]);

  async function handleAuth() {
    try {
      const res = await auth.requestAuthentication();
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
    }
  }
  // add selection of class
  return (
    <div className={styles.scrollContainer}>
      {!isAuthorized ? (
        <>
          <h3 style={{ textTransform: 'capitalize' }}>
            Ready to create some engaging slides for your lesson?
          </h3>
          <h3 style={{ textTransform: 'capitalize' }}>
            Let's generate them with Canva!
          </h3>
          <Button variant="primary" onClick={handleAuth} stretch>
            Continue
          </Button>
        </>
      ) : (
        <>
          <h2 style={{ textTransform: 'capitalize' }}>
            Hi! {userProfile?.name}
          </h2>
          <Select
            options={classList}
            placeholder="Select a class"
            stretch
            value={classId}
            onChange={(value) => setClassId(value)}
          />
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div style={{ marginTop: '20px' }}>
              {lessonList.length !== 0 ? (
                <Rows align="stretch" spacing="1u">
                  {lessonList.map((item) => (
                    <div
                      key={item.id}
                      onClick={async () => await handleClick(item)}
                    >
                      <Box
                        background="tabdock"
                        borderRadius="large"
                        padding="1u"
                        flexDirection="row"
                        display="flex"
                      >
                        <Avatar name="Cover lesson" photo={item.cover} />
                        <Box paddingStart="1u">
                          <Title size="xsmall" lineClamp={1}>
                            {item.name}
                          </Title>
                          <Box paddingY="0.5u">
                            <Badge
                              ariaLabel="level"
                              shape="regular"
                              text={item.level}
                              tone="assist"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  ))}
                </Rows>
              ) : (
                <EmptyStyled
                  style={{ color: 'white', padding: '20px' }}
                  description="No lesson"
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const EmptyStyled = styled(Empty)`
  .ant-empty-description {
    color: white;
  }
`;
